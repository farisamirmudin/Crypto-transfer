import { useContext } from "react"
import { TransactionContext } from "../context/TransactionContext"

const ConnectButton = () => {
  const { connectWallet, hasMetamask, currentAccount } = useContext(TransactionContext)
  return (
    <button onClick={connectWallet} disabled={!hasMetamask} className={`px-4 py-2 bg-blue-600 ${hasMetamask && "hover:bg-blue-500"} disabled:cursor-not-allowed disabled:opacity-50 rounded-lg text-white`}>{currentAccount ? 'Connected' : 'Connect Wallet'}</button>
  )
}

export default ConnectButton