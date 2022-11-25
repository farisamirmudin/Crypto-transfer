import { useContext, useState } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { addressLink } from './Address'

const ShowTransactions = ()=> {
  const { transactions } = useContext(TransactionContext)
  const [ishidden, setIsHidden] = useState(true)
  if (transactions.length) {
    return (
      <div className='pt-10 pb-20 self-center'>
        <p className='text-4xl text-center'>Transactions</p>
        <p className='text-sm mb-12 text-gray-600 text-center'>Click on the date for more info</p>
        <div className="">
          {transactions.map((transaction, i) => (
            <div className='bg-slate-200 px-4 py-2 my-3 rounded-xl' key={i}>
              <div className="hover:cursor-pointer text-lg font-light" onClick={() => setIsHidden(prev => !prev)}>{transaction.timestamp}</div>
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