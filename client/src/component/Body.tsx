import EthereumCard from "./EthereumCard";
import Transactions from "./Transactions";
import TransactionForm from "./TransactionForm";

const Body = () => {
  return (
    <div className="hero flex-1 bg-base-200">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="flex flex-col items-center gap-2 pt-8">
            <p className="text-4xl">Transactions</p>
            <p className="text-sm">Scroll to the right to see more.</p>
          </div>
          <div className="card-body">
            <Transactions />
          </div>
        </div>
        <div className="card w-[600px] bg-base-100 shadow-xl">
          <EthereumCard />
          <div className="card-body">
            <TransactionForm />
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold">
            Send crypto across the internet
          </h1>
          <p className="py-6">
            Explore Web 3.0 and Blockchain technology, implementing token
            transfer and event emission using a smart contract deployed on the
            Goerli test network.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Reliability",
              "Security",
              "Blockchain",
              "Web 3.0",
              "Metamask",
              "Ethereum",
            ].map((item) => (
              <button
                key={item}
                className="btn btn-active btn-neutral no-animation"
              >
                <p>{item}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
