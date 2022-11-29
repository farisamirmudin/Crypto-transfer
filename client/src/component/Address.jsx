
export const ShortenAddress = (address) => {
  return `${address.slice(0,4)}...${address.slice(-4)}`
}
export const addressLink = (address) => {
  return (
    <a href={`https://goerli.etherscan.io/address/${address}`} target="_blank" className="text-gray-700 hover:text-gray-500 after:content-['_↗']">{ShortenAddress(address)}</a>
  )
}
