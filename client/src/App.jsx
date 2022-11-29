import Body from './component/Body'
import Nav from './component/Nav'
import { TransactionProvider } from './context/TransactionContext'
import Footer from './component/Footer'

function App() {

  return (
    <div className='px-16 max-w-screen-lg mx-auto'>
      <TransactionProvider>
        <Nav />
        <Body />
      </TransactionProvider>
      <Footer />
    </div>
  )
}

export default App
