import EthereumCard from "./EthereumCard";
import TransactionForm from "./TransactionForm";

const Body = () => {
  return (
    <div className="hero py-12 bg-base-200">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse">
        <div className="card w-80 lg:w-96 bg-base-100 shadow-xl">
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
            transfer and event emission using smart contract deployed on Goerli
            test network.
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
          {window.ethereum && (
            <label
              htmlFor="transaction-drawer"
              className="btn btn-outline btn-accent mt-8"
            >
              See all transactions
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
