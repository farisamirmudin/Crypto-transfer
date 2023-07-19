import { ReactNode, createContext, useEffect, useReducer } from "react";
import {
  BrowserProvider,
  ContractTransactionResponse,
  Eip1193Provider,
  ethers,
} from "ethers";
import abi from "../utils/Transactions.json";
import { FormInputs } from "../typings/FormInput";
import { z } from "zod";

declare global {
  interface Window {
    ethereum: BrowserProvider & Eip1193Provider;
  }
}

const Web3Error = z.object({
  code: z.string(),
  message: z.string(),
});

type State = {
  contract?: ethers.Contract;
  provider?: ethers.BrowserProvider;
  signer?: ethers.JsonRpcSigner;
  connectedWalletAddress?: string;
  transactions?: Transaction[];
  errorMessages?: string;
};

type Transaction = {
  sender: string;
  receiver: string;
  message: string;
  timestamp: number;
  keyword: string;
  amount: number;
};

type TransactionContextProps = {
  connectedWalletAddress?: string;
  transactions?: Transaction[];
  errorMessages?: string;
  connectWallet: () => Promise<void>;
  sendTransaction: (data: FormInputs) => Promise<void>;
};

export const TransactionContext = createContext<TransactionContextProps>({
  connectedWalletAddress: undefined,
  transactions: undefined,
  errorMessages: undefined,
  connectWallet: async () => undefined,
  sendTransaction: async () => undefined,
});

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    (prev: State, next: State) => ({
      ...prev,
      ...next,
    }),
    {
      contract: undefined,
      provider: undefined,
      signer: undefined,
      connectedWalletAddress: undefined,
      transactions: undefined,
      errorMessages: undefined,
    }
  );

  useEffect(() => {
    if (!window.ethereum) {
      dispatch({ errorMessages: "Metamask is not installed" });
      return;
    }
    const populateState = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          import.meta.env.VITE_CONTRACT_ADDRESS,
          abi.abi,
          signer
        );
        dispatch({ contract, provider, signer });
      } catch (error: unknown) {
        const parsedError = Web3Error.parse(error);
        dispatch({ errorMessages: parsedError.message.split("(")[0].trim() });
      }
    };
    populateState();
  }, []);

  useEffect(() => {
    if (!state.contract) return;
    getAllTransactions();
  }, [state.contract]);

  const connectWallet = async () => {
    if (!state.provider) return;
    try {
      const wallets = (await state.provider.send(
        "eth_requestAccounts",
        []
      )) as string[];
      dispatch({ connectedWalletAddress: wallets?.[0] });
    } catch (error: unknown) {
      const parsedError = Web3Error.parse(error);
      dispatch({ errorMessages: parsedError.message.split("(")[0].trim() });
    }
  };

  const getAllTransactions = async () => {
    if (!state.contract) return;
    try {
      const transactions =
        (await state.contract.getAllTransactions()) as Transaction[];

      const parsedTransaction = transactions.map(
        ({ sender, receiver, message, timestamp, keyword, amount }) => ({
          sender,
          receiver,
          message,
          timestamp: Number(timestamp),
          keyword,
          amount: Number(amount) / 10 ** 18,
        })
      );
      dispatch({ transactions: parsedTransaction });
    } catch (error: unknown) {
      const parsedError = Web3Error.parse(error);
      dispatch({ errorMessages: parsedError.message.split("(")[0].trim() });
    }
  };

  const sendTransaction = async ({
    receiver,
    amount,
    keyword,
    message,
  }: FormInputs) => {
    const { provider, connectedWalletAddress, contract } = state;
    if (!provider || !contract || !connectedWalletAddress) return;
    try {
      const parsedAmount = ethers.parseEther(amount);
      await provider.send("eth_sendTransaction", [
        {
          from: connectedWalletAddress,
          to: receiver,
          gas: "0x5208",
          value: parsedAmount,
        },
      ]);

      const transactionHash = (await contract.addToBlockchain(
        receiver,
        parsedAmount,
        message,
        keyword
      )) as ContractTransactionResponse;

      console.log(`Loading ${transactionHash.hash}`);
      const transactionReceipt = await transactionHash.wait();
      console.log(`Success ${transactionHash.hash}`);
      console.log({ transactionReceipt });
      getAllTransactions();
    } catch (error: unknown) {
      const parsedError = Web3Error.parse(error);
      dispatch({ errorMessages: parsedError.message.split("(")[0].trim() });
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        connectedWalletAddress: state.connectedWalletAddress,
        transactions: state.transactions,
        errorMessages: state.errorMessages,
        connectWallet,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
