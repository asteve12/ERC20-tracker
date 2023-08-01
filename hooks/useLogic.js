import { ethers } from "ethers";
import { useState } from "react";
import erc20Abi from "../abi";

//utility
function createContractInstance(objectoFTokenAddresses) {
  if (typeof objectoFTokenAddresses !== "object")
    throw new Error("only object is requird for argument");
    
  const arrayoFRpcUrl = Object.keys(objectoFTokenAddresses);

  console.log("typers", typeof process.env.NEXT_PUBLIC_RPC_URL);

  const providers = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);

  arrayoFRpcUrl.forEach((eachObjectkey) => {
    console.log(
      "typers",
      typeof objectoFTokenAddresses,
      objectoFTokenAddresses
    );

    this[eachObjectkey] = new ethers.Contract(
      objectoFTokenAddresses[eachObjectkey],
      erc20Abi,
      providers
    );

    console.log("emitters", this);
  });
}

export const uselogic = () => {
  const [transactionObjectsUSDT, settransactionUSDT] = useState([]);
  const [transactionObjectsUSDC, settransactionUSDC] = useState([]);
  const [transactionObjectsDAI, settransactionDAI] = useState([]);

  const token_address_pair = {
    USDT: process.env.NEXT_PUBLIC_USDT_CONTRACT_Address,
    DAI: process.env.NEXT_PUBLIC_Dai_CONTRACT_Address,
    USDC: process.env.NEXT_PUBLIC_USDC_CONTRACT_Address,
  };

  const instanceobject = new createContractInstance(token_address_pair);

  instanceobject.USDT.on("Transfer", (from, to, value, event) => {
    console.log('test',from, to, value)
    settransactionUSDT((prev) => [...prev, { from, to, value }]);
  });

  instanceobject.DAI.on("Transfer", (from, to, value, event) => {
    settransactionDAI((prev) => [...prev, { from, to, value }]);
  });

  instanceobject.USDC.on("Transfer", (from, to, value, event) => {
    settransactionUSDC((prev) => [...prev, { from, to, value }]);
  });

  return {
    transactionObjectsUSDT,
    transactionObjectsUSDC,
    transactionObjectsDAI,
  };
};
