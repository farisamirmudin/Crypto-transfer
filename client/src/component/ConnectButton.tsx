import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/helper";

const ConnectButton = () => {
  const { connectWallet, connectedWalletAddress } =
    useContext(TransactionContext);
  return (
    <button onClick={connectWallet} className="btn btn-outline btn-accent">
      {connectedWalletAddress
        ? shortenAddress(connectedWalletAddress)
        : "Connect"}
    </button>
  );
};

export default ConnectButton;
