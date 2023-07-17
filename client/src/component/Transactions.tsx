import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { Address } from "./Address";

export default function Transactions() {
  const { transactions } = useContext(TransactionContext);
  if (!transactions || transactions.length === 0) return null;

  return (
    <div className="min-w-64 carousel rounded-box">
      {transactions.map(({ timestamp, receiver, sender, amount, message }) => (
        <div className="carousel-item w-full bg-neutral-focus" key={timestamp}>
          <div className="flex flex-col gap-4 p-8">
            <div>{new Date(timestamp * 1000).toLocaleString()}</div>
            <div>
              <p>To:</p> <Address address={receiver} />
            </div>
            <div>
              <p>From:</p> <Address address={sender} />
            </div>
            <div>
              <p>Amount:</p> {amount} ETH
            </div>
            <div>
              <p>Message:</p> {message}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
