import { useState } from 'react'

import './App.css'

function App() {
  const [totalSupply, setTotalSupply] = useState(0)
  const [supplyApy, setSupplyApy] = useState(0)
  const [totalBorrowed, setTotalBorrowed] = useState(0)
  const [borrowApy, setBorrowApy] = useState(0)




  return (
    <>
      <div>
        <h3>USDC Market</h3>
        <p>Total supplied: {totalSupply} </p>
        <p>Supply APY: {supplyApy} </p>
        <p>Total Borrowed: {totalBorrowed} </p>
        <p>Borrowed APy: {borrowApy} </p>
      </div>

    </>
  )
}

export default App
