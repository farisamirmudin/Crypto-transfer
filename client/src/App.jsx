import Body from './component/Body'
import Nav from './component/Nav'
import { TransactionProvider } from './context/TransactionContext'
import Footer from './component/Footer'

function App() {

  return (
    <div className='bg-slate-100 px-20 md:px-40 min-h-screen flex flex-col'>
      <Nav />
      <TransactionProvider>
        <Body />
      </TransactionProvider>
      <Footer />
    </div>
  )
}

export default App
