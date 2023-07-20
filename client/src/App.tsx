import { Toaster } from "react-hot-toast";
import Body from "./component/Body";
import Nav from "./component/Nav";
import { TransactionProvider } from "./context/TransactionContext";
import Transactions from "./component/Transactions";

function App() {
  return (
    <TransactionProvider>
      <Toaster position="bottom-right" />
      <div className="drawer drawer-end">
        <input
          id="transaction-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Nav />
          <Body />
        </div>
        <div className="drawer-side">
          <label htmlFor="transaction-drawer" className="drawer-overlay" />
          <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
            <Transactions />
          </ul>
        </div>
      </div>
    </TransactionProvider>
  );
}

export default App;
