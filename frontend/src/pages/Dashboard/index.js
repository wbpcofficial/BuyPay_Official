import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSync, FaQrcode } from "react-icons/fa";
import Top from "./Top";
import Card from "./Card";
import SendTransaction from "./SendTransaction";
import TokenList from "./TokenList";
import Modal from "../../components/Modal";
import styles from "./index.module.scss";
import {
  option_etherscan_api,
  option_etherscan_api_key,
} from "../../constants";
const Web3 = require("../../utils/web3/web3.min.js");

const Dashboard = () => {
  const [publicAddr, setPublicAddr] = useState("");
  const [balance, setBalance] = useState(0);
  const [addressModal, setAddressModal] = useState(false);
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
  const addressQrCode =
    "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=" +
    publicAddr +
    "&choe=UTF-8&chld=L|0";
  return (
    <div className={styles.dashboard}>
      <Top />
      <div className={styles.cardContainer}>
        <div className={styles.flex}>
          <Card style={styles.address} title="Address" content={publicAddr}>
            <FaQrcode
              className={styles.cardIcon}
              onClick={() => {
                setAddressModal(true);
              }}
            />
          </Card>
          <Card
            style={styles.balance}
            title="Balance"
            content={balance + " ETH"}
          >
            <FaSync
              className={styles.cardIcon}
              onClick={() => {
                getBalance(publicAddr);
              }}
            />
          </Card>
          <Card style={styles.network} title="Network" content="" />
        </div>

        <div className={styles.flex}>
          <Card isCard={false} style={styles.sendTransaction}>
            <SendTransaction ks={ks} address={publicAddr} balance={balance} />
          </Card>
          <Card isCard={false} style={styles.tokenList}>
            <TokenList publicAddr={publicAddr} />
          </Card>
        </div>
      </div>
      {addressModal && (
        <Modal title={"Address"} onClose={setAddressModal}>
          <img className={styles.qrCode} src={addressQrCode} alt="" />
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
