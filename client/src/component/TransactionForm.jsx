import { useContext } from "react"
import { TransactionContext } from "../context/TransactionContext"
import Spinner from "./Spinner"

const TransactionForm = () => {

  const { currentAccount, formData, handleChange, sendTransaction, isLoading } = useContext(TransactionContext)
  const { receiver, amount, keyword, message } = formData
  const style = "rounded p-2 bg-transparent text-white bg-[#ffffff0d]"
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!receiver || !amount || !keyword || !message ) return
    sendTransaction()
  }
  return (
    <div className="rounded-xl bg-gradient-to-br from-[#342E2A] to-[#425C76] p-6">
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <input type="text" placeholder='Address To' name='receiver' value={formData.receiver} onChange={handleChange} className={style} />
        <input type="text" placeholder='Amount (ETH)' name='amount' value={formData.amount} onChange={handleChange} className={style} />
        <input type="text" placeholder='Keyword' name='keyword' value={formData.keyword} onChange={handleChange} className={style} />
        <input type="text" placeholder='Enter Message' name='message' value={formData.message} onChange={handleChange} className={style} />
        <div className="mt-2">
          {isLoading ? <Spinner /> :
          <button disabled={!currentAccount} className={`border border-white ${currentAccount && "hover:bg-[#ffffff1a]"} text-white rounded-full p-2 w-full disabled:opacity-50 disabled:cursor-not-allowed`}>Send now</button>
          }
        </div>
      </form>
    </div>
  )
}

export default TransactionForm