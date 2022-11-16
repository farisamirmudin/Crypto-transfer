import { useContext, useState } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { addressLink } from './Address'

const ShowTransactions = ()=> {
  const { transactions } = useContext(TransactionContext)
  const [ishidden, setIsHidden] = useState(true)
  if (transactions.length) {
    return (
      <div className='pt-10 pb-20 text-center '>
        <p className='text-4xl'>Transactions</p>
        <p className='text-sm mb-12 text-gray-600'>Click on the date for more info</p>
        <div className="flex md:flex-row flex-col gap-5 flex-wrap box-content justify-center">
          {transactions.map((transaction, i) => (
            <div className='bg-slate-200 p-4 rounded-xl' key={i}>
              <div className="hover:cursor-pointer" onClick={() => setIsHidden(prev => !prev)}>{transaction.timestamp}</div>
              <div className={`${ishidden ? "hidden" : ""}`}>
                <div className="border-t-2 border-slate-300 my-4"></div>
                <p><strong>From:</strong> {addressLink(transaction.sender)}</p>
                <p><strong>To:</strong> {addressLink(transaction.receiver)}</p>
                <div className="border-t-2 border-slate-300 my-4"></div>
                <p><strong>Amount:</strong> {transaction.amount} ETH</p>
                <p><strong>Message:</strong> {transaction.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return <></>
}

export default ShowTransactions