import React, { useState, useEffect } from "react";
import axios from "axios";

import Top from "./Top";
import Card from "./Card";
import SendTransaction from "./SendTransaction";
import styles from "./index.module.scss";
import {
  option_etherscan_api,
  option_etherscan_api_key,
} from "../../constants";
const Web3 = require("../../utils/web3/web3.min.js");

const Dashboard = () => {
  const [publicAddr, setPublicAddr] = useState("");
  const [balance, setBalance] = useState(0);
  const [ks, setKs] = useState("");
  useEffect(() => {
    let res = JSON.parse(localStorage.getItem("auth"));
    setPublicAddr("0x" + res.user.addr);
    getBalance("0x" + res.user.addr);
    setKs(res.user.keystorage);
  }, []);

  const getBalance = async (addr) => {
    try {
      const response = await axios.get(
        option_etherscan_api +
          "/api?module=account&action=balance&address=" +
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
    <div className={styles.dashboard}>
      <Top />
      <div className={styles.cardContainer}>
        <div className={styles.flex}>
          <Card style={styles.address} title="Address" content={publicAddr} />
          <Card
            style={styles.balance}
            title="Balance"
            content={balance + " ETH"}
          />
          <Card style={styles.network} title="Network" content="" />
        </div>

        <div className={styles.flex}>
          <Card isCard={false} style={styles.sendTransaction}>
            <SendTransaction ks={ks} address={publicAddr} balance={balance} />
          </Card>
          <Card isCard={false} style={styles.tokenList} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
