import ConnectButton from './ConnectButton'
import { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'

const Nav = () => {
  const { hasMetamask } = useContext(TransactionContext)
  return (
    <nav className="flex justify-between py-4">
      <p className="text-4xl">Kryptransfer</p>
      <div className="">
      <ConnectButton />
      {!hasMetamask && <p className='text-red-600 text-xs italic'>*Please install Metamask</p>}
      </div>
    </nav>
  )
}

export default Nav