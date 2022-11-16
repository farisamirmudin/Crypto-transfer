import { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import ConnectButton from './ConnectButton'
import EthereumCard from './EthereumCard'
import ShowTransactions from './ShowTransactions'
import TransactionForm from './TransactionForm'


const style = "rounded-full bg-slate-200 py-2 px-4 flex-none"
const Body = () => {
  const { hasMetamask } = useContext(TransactionContext)
  return (
    <>
      <div className='flex md:flex-row flex-col pt-10 justify-center'>
        <div className='flex flex-col justify-center items-center'>
          <div className="md:w-4/5">
            <p className='text-6xl mb-4'>Send crypto across the internet</p>
            <p className='mb-6'>Explore Web 3.0 and Blockchain technology. Buy and sell crypto here on Cryptchange</p>
            <ConnectButton />
            {!hasMetamask && <p className='text-red-600 text-sm italic my-2'>* Please install Metamask</p>}

            <div className="flex gap-2 flex-wrap items-center my-6">
              <div className={style}>
                <p>Reliability</p>
              </div>
              <div className={style}>
                <p>Security</p>
              </div>
              <div className={style}>
                <p>Blockchain</p>
              </div>
              <div className={style}>
                <p>Web 3.0</p>
              </div>
              <div className={style}>
                <p>Metamask</p>
              </div>
              <div className={style}>
                <p>Ethereum</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <EthereumCard />
          <TransactionForm />
        </div>
      </div>
      <ShowTransactions />
    </>
  )
}

export default Body