import { shortenAddress } from "../utils/helper";

export const Address = ({ address }: { address: string }) => {
  return (
    <a
      href={`https://goerli.etherscan.io/address/${address}`}
      target="_blank"
      className="text-gray-500 hover:text-gray-300 after:content-['_↗']"
    >
      {shortenAddress(address)}
    </a>
  );
};
