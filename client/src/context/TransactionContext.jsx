import { createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/smartContract'


export const TransactionContext = createContext({})

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [transactionsCount, setTransactionsCount] = useState(window.localStorage.getItem('transactionsCount'))
  const [hasMetamask, setHasMetamask] = useState(true)
  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
    keyword: "",
    message: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const getEthereumContract = () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
      return transactionContract
    } catch (error) {
      throw error
    }
  }

  const checkIfWalletisConnected = async () => {
    try {
      if (!window.ethereum) {
        setHasMetamask(false)
        return
      }
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if (accounts.length){
        setCurrentAccount(accounts[0])
        checkIfTransactionExist()
        getAllTransactions()
      } 
      else {
        setCurrentAccount("")
        setTransactions([])
      }
    } catch (error) {
      throw error
    }
  }

  const checkIfTransactionExist = async () => {
    try {
      const transactionContract = getEthereumContract()
      const count = await transactionContract.getTransactionsCount()
      window.localStorage.setItem("transactionsCount", count)
    } catch (error) {
      throw error
    }
    
  }

  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error("Please install metamask")
      const reqAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      if (reqAccounts.length) {
        setCurrentAccount(reqAccounts[0])
        checkIfTransactionExist()
        getAllTransactions()
      }
    } catch (error) {
      throw error
    }
  }

  const getAllTransactions = async () => {
    try {
      if (!window.ethereum) throw new Error("please install metamask")
      const transactionContract = getEthereumContract()
      const availableTransactions = await transactionContract.getAllTransactions()

      const transactionsObj = availableTransactions.map(transaction => ({
        sender: transaction.sender,
        receiver: transaction.receiver,
        message: transaction.message,
        timestamp: new Date(parseInt(transaction.timestamp) * 1000).toLocaleString(),
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }))
      
      setTransactions(transactionsObj)
    } catch (error) {
      throw error 
    }
  }

  const sendTransaction = async () => {
    try {
      if (!window.ethereum) throw new Error("please install metamask")
      const { receiver, amount, keyword, message } = formData
      const transactionContract = getEthereumContract()
      const parsedAmount = ethers.utils.parseEther(amount)
      
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: receiver,
            gas: '0x5208',
            value: parsedAmount._hex
          }
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(receiver, parsedAmount, message, keyword)
      setIsLoading(true)
      console.log(`Loading ${transactionHash.hash}`)
      await transactionHash.wait()
      setIsLoading(false)
      console.log(`Success ${transactionHash.hash}`)

      const count = await transactionContract.getTransactionsCount()
      setTransactionsCount(count)
      getAllTransactions()
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    checkIfWalletisConnected()
  }, [])
  
  useEffect(() => {
    if (!window.ethereum) {
      setHasMetamask(false)
      return
    }
    if (window.ethereum.isConnected()){
      window.ethereum.on('accountsChanged', checkIfWalletisConnected)
    }
    
    return () => {
      if (window.ethereum.isConnected()){
        window.ethereum.removeListener('accountsChanged', checkIfWalletisConnected)
      }
    }
  }, [currentAccount])

  return (
    <TransactionContext.Provider value={{ currentAccount, connectWallet, formData, handleChange, sendTransaction, isLoading, transactions, hasMetamask }}>
      {children}
    </TransactionContext.Provider>
  )
}