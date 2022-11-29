import EthereumCard from './EthereumCard'
import ShowTransactions from './ShowTransactions'
import TransactionForm from './TransactionForm'

const Body = () => {
  return (
    <>
      <div className="flex gap-6 py-8 md:flex-row flex-col">
        <div className="space-y-6">
          <p className='lg:text-6xl text-5xl'>Send crypto across the internet</p>
          <p className='text-gray-600'>Explore Web 3.0 and Blockchain technology. Buy and sell crypto here on Cryptchange</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {['Reliability', 'Security', 'Blockchain', 'Web 3.0', 'Metamask', 'Ethereum'].map((item, i) =>
              <div key={i} className='bg-slate-200 py-2 px-4 text-center shadow-md rounded-lg'>
                <p>{item}</p>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-6 self-center">
          <EthereumCard />
          <TransactionForm />
        </div>
      </div>
      <ShowTransactions />
    </>
  )
}

export default Body