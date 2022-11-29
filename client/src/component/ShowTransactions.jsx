import { useContext, useState } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { addressLink } from './Address'

const ShowTransactions = ()=> {
  const { transactions } = useContext(TransactionContext)
  const [ishidden, setIsHidden] = useState(true)
  if (transactions.length) {
    return (
      <div className=''>
        <p className='text-4xl'>Transactions</p>
        <p className='text-sm text-gray-600 mb-8'>Click on the date for more info</p>
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
          {transactions.map((transaction, i) => (
            <div className='bg-slate-200 px-4 py-2 shadow-md rounded-lg' key={i}>
              <div className="hover:cursor-pointer" onClick={() => setIsHidden(prev => !prev)}>{transaction.timestamp}</div>
              <div className={`${ishidden ? "hidden" : ""}`}>
                <p><strong>To:</strong> {addressLink(transaction.receiver)}</p>
                <p><strong>From:</strong> {addressLink(transaction.sender)}</p>
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