import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";
import { ethers } from "ethers";
import aaveABI from './ABI/AaveABI.json';

const INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY;



function App() {
  const [usdcData, setUsdcData] = useState({
    totalSupplied: 0,
    supplyAPY: 0,
    totalBorrowed: 0,
    borrowAPY: 0,
  });

  const AAVE_CONTRACT_ADDRESS = "0x497a1994c46d4f6C864904A9f1fac6328Cb7C8a6";
  // Relevent parts of ABI
  const USDC_CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Connect to network
        const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`)
        const contract = new ethers.Contract(
          AAVE_CONTRACT_ADDRESS,
          aaveABI,
          provider
        );
        const reserveData = await contract.getReserveData(
          USDC_CONTRACT_ADDRESS
        );
        setUsdcData({
          totalSupplied: Number(ethers.formatUnits(reserveData.totalAToken, 6)),
          supplyAPY: Number(reserveData.liquidityRate) / 1e25, // Divide by 1e25 as it is a ray (27 decimal places)
          totalBorrowed: Number(ethers.formatUnits(reserveData.totalVariableDebt, 6)),
          borrowAPY: Number(reserveData.variableBorrowRate) / 1e25 // Divide by 1e25 as it is a ray (27 decimal placse), 
        });

        // Important data: Total borrowed = getTotalDebt, Total Supply = getATokenTotalSupply
        // APY = Annual percentage yield supply APY is liquidity rate
        // Total borrowed APY is the variable borrow rate. Use the getReserveData function for all data
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <h3>USDC Market Data</h3>
        <Table data={usdcData} />
      </div>
    </>
  );
}

export default App;
