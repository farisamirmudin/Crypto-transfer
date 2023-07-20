import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { Address } from "./Address";

export default function Transactions() {
  const { transactions } = useContext(TransactionContext);
  if (!transactions || transactions.length === 0) return null;

  return (
    <div className="flex flex-col gap-8">
      {transactions.map(({ timestamp, receiver, sender, amount, message }) => (
        <div key={timestamp}>
          <p className="text-md">
            {new Date(timestamp * 1000).toLocaleString()}
          </p>
          <p>
            To: <Address address={receiver} />
          </p>
          <p>
            From: <Address address={sender} />
          </p>
          <p>Amount: {amount} ETH</p>
          <p>Message: {message}</p>
        </div>
      ))}
    </div>
  );
}
