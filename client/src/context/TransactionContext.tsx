import { ReactNode, createContext, useEffect, useReducer } from "react";
import {
  BrowserProvider,
  ContractTransactionResponse,
  Eip1193Provider,
  ethers,
} from "ethers";
import abi from "../utils/Transactions.json";
import { FormInputs } from "../typings/FormInput";

declare global {
  interface Window {
    ethereum: BrowserProvider & Eip1193Provider;
  }
}

type State = {
  contract?: ethers.Contract;
  provider?: ethers.BrowserProvider;
  signer?: ethers.JsonRpcSigner;
  connectedWalletAddress?: string;
  transactions?: Transaction[];
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
  connectWallet: () => Promise<void>;
  sendTransaction: (data: FormInputs) => Promise<void>;
};

export const TransactionContext = createContext<TransactionContextProps>({
  connectedWalletAddress: undefined,
  transactions: undefined,
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
    }
  );

  useEffect(() => {
    const populateState = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        abi.abi,
        signer
      );
      dispatch({ contract, provider, signer });
    };
    populateState();
  }, []);

  useEffect(() => {
    getAllTransactions();
  }, [state.contract]);

  const connectWallet = async () => {
    if (!state.provider) return;
    const wallets = (await state.provider.send(
      "eth_requestAccounts",
      []
    )) as string[];
    dispatch({ connectedWalletAddress: wallets?.[0] });
  };

  const getAllTransactions = async () => {
    if (!state.contract) return;
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
  };

  const sendTransaction = async ({
    receiver,
    amount,
    keyword,
    message,
  }: FormInputs) => {
    const { provider, connectedWalletAddress, contract } = state;
    if (!provider || !contract || !connectedWalletAddress) return;
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
  };

  return (
    <TransactionContext.Provider
      value={{
        connectedWalletAddress: state.connectedWalletAddress,
        transactions: state.transactions,
        connectWallet,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
