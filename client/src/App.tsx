import Body from "./component/Body";
import Nav from "./component/Nav";
import { TransactionProvider } from "./context/TransactionContext";

function App() {
  return (
    <TransactionProvider>
      <div className="flex flex-col min-h-screen">
        <Nav />
        <Body />
      </div>
    </TransactionProvider>
  );
}

export default App;
