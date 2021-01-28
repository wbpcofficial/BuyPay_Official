import React, { useState, useEffect } from "react";
import axios from "axios";

import TokenItem from "./TokenItem";
import styles from "./index.module.scss";
import {
  option_etherscan_api,
  option_etherscan_api_key,
  erc20contract_function_address,
} from "../../constants";
const Web3 = require("../../utils/web3/web3.min.js");

const TokenList = ({ publicAddr }) => {
  const [balance, setBalance] = useState(0);
  const [contractFunctionAddress, setContractFunctionAddress] = useState("");

  useEffect(() => {
    setContractFunctionAddress(erc20contract_function_address);
    getTokenBalance(publicAddr);
  }, [publicAddr]);

  const getTokenBalance = async (addr) => {
    try {
      const response = await axios.get(
        option_etherscan_api +
          "/api?module=account&action=tokenbalance&contractaddress=" +
          contractFunctionAddress +
          "&address=" +
          addr +
          "&tag=latest&apikey=" +
          option_etherscan_api_key
      );
      const _balance = Web3.utils.fromWei(response.data.result, "ether");
      setBalance(_balance);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tokenTop}>
          <div className={styles.tokens}>
            <span>Tokens</span>
            <img src="/assets/images/tokens.svg" alt="" />
          </div>
          <span className={styles.customToken}>+ Custom Tokens</span>
        </div>
        <input />
      </div>
      <div className={styles.content}>
        <TokenItem
          address={contractFunctionAddress}
          symbol={"WBPC"}
          balance={balance}
        />
      </div>
    </div>
  );
};

export default TokenList;
