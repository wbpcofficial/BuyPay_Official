import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Switch from "react-switch";
import axios from "axios";
import swal from "sweetalert";

import styles from "./index.module.scss";
import {
  erc20contract_address,
  option_etherscan_api,
  option_etherscan_api_key,
} from "../../constants";
const lightwallet = require("../../utils/web3/lightwallet.min.js");

const ERC20ABI = require("../../constants/abi.json");
const addressOption = [
  {
    value: erc20contract_address,
    label: erc20contract_address + " - BuyPay ERC20 token",
  },
];

const typeOption = [
  { value: "eth", label: "ETH - Ethereum" },
  { value: "wbpc", label: "WBPC - BuyPay ERC20 Token" },
];
const SendTransaction = ({ address, balance, ks }) => {
  const [advancedToggle, setAdvancedToggle] = useState(false);
  const [amount, setAmount] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [toAddress, setToAddress] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setTotalBalance(balance);
  }, [balance]);

  const sendRwTr = async (value1, args, abifunc, to) => {
    try {
      const response = await axios.post(
        option_etherscan_api +
          "/api?module=proxy&action=eth_getTransactionCount&address=" +
          address +
          "&tag=latest&apikey=" +
          option_etherscan_api_key
      );

      let options = {};
      let gasPrice = "0x174876E800";
      options.nonce = response.data.result;
      options.to = to;
      // options.gasPrice = Web3.utils.toHex('100000000000');
      options.gasPrice = gasPrice;
      options.gasLimit = 0x927c0; //web3.toHex('210000');
      options.value = value1 * 1000000000000000000;
      let password = "buypaywallet";
      if (password || password === "") {
        let keystorage = lightwallet.keystore.deserialize(ks);
        keystorage.keyFromPassword(
          password,
          async function (err, pwDerivedKey) {
            if (err) {
              console.log(err);
              return;
            }

            let registerTx;
            if (abifunc === "") {
              registerTx = lightwallet.txutils.valueTx(options);
            } else {
              registerTx = lightwallet.txutils.functionTx(
                ERC20ABI,
                abifunc,
                args,
                options
              );
            }

            let signedTx = lightwallet.signing.signTx(
              keystorage,
              pwDerivedKey,
              registerTx,
              address
            );
            try {
              const txId = await axios.get(
                option_etherscan_api +
                  "/api?module=proxy&action=eth_sendRawTransaction&hex=" +
                  "0x" +
                  signedTx +
                  "&apikey=" +
                  option_etherscan_api_key
              );
              console.log(txId.data.result);
              swal(
                "Thank you.",
                "The transaction has been successfully made. Please check with this transaction id.\n txId:" +
                  txId.data.result,
                "success"
              );
            } catch (e) {
              console.log(e);
            }
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdvancedToggle = () => {
    setAdvancedToggle(!advancedToggle);
  };

  const handleAddressChange = (newValue, actionMeta) => {
    newValue && newValue.value
      ? setToAddress(newValue.value)
      : setToAddress("");
  };

  const handleAddressInputChange = (inputValue, actionMeta) => {
    // console.group("Input Changed");
    // console.log(inputValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };

  const handleTypeChange = (newValue, actionMeta) => {
    setType(newValue.value);
  };

  const handleTypeInputChange = (inputValue, actionMeta) => {
    // console.group("Input Changed");
    // console.log(inputValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };

  const handleEntireBalance = () => {
    setAmount(totalBalance);
  };

  const handleSendTransaction = () => {
    const value = parseFloat(amount);
    if (type === "eth") sendRwTr(value, "", "", toAddress);
    else if (type === "wbpc")
      sendRwTr(
        0,
        [toAddress, value * 1000000000000000000],
        "transfer",
        erc20contract_address
      );
  };

  return (
    <div>
      <p className={styles.title}>Send Transaction</p>

      <div className={styles.flexBlock}>
        <div className={styles.flexColumnBlock} style={{ flex: 6 }}>
          <p className={styles.label}>Type</p>
          <CreatableSelect
            onChange={handleTypeChange}
            onInputChange={handleTypeInputChange}
            options={typeOption}
          />
        </div>

        <div
          className={styles.flexColumnBlock}
          style={{ flex: 8, marginLeft: "16px" }}
        >
          <div className={styles.flexBlock}>
            <p className={styles.label}>Amount</p>
            <span
              className={styles.entireBalance}
              onClick={() => {
                handleEntireBalance();
              }}
            >
              Entire Balane
            </span>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(event) => {
              event.target.value < 0
                ? setAmount(0)
                : setAmount(event.target.value);
            }}
          />
        </div>
      </div>

      <div className={styles.flexColumnBlock} style={{ marginTop: "34px" }}>
        <p className={styles.label}>To address</p>
        <CreatableSelect
          isClearable
          onChange={handleAddressChange}
          onInputChange={handleAddressInputChange}
          options={addressOption}
        />
      </div>

      <div className={styles.flexColumnBlock} style={{ marginTop: "60px" }}>
        <div className={styles.flexBlock}>
          <p className={styles.label}>Transaction Free</p>
          <span className={styles.entireBalance}>Edit</span>
        </div>

        <div className={styles.flexBlock}>
          <p>-332.00 Gwei</p>
          <p>Cost 0.006972 ETH = $7.77</p>
        </div>
      </div>

      <div className={styles.gasFeeWarning}>
        <p>Warning: High gas prices mean higer transcation fees.</p>
      </div>

      <div className={styles.flexBlock} style={{ marginTop: "77px" }}>
        <p className={styles.label}>Advanced</p>
        <div className={styles.flexBlock}>
          <p style={{ marginRight: "20px", marginTop: "5px" }}>
            {"Data & Gas Limit"}
          </p>
          <Switch
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            onChange={handleAdvancedToggle}
            checked={advancedToggle}
          />
        </div>
      </div>

      <div className={styles.flexColumnBlock} style={{ marginTop: "117px" }}>
        <div
          className={styles.submitBtn}
          onClick={() => {
            handleSendTransaction();
          }}
        >
          <p>SendTransaction</p>
        </div>
        <div className={styles.clearBtn}>
          <p>Clear All</p>
        </div>
      </div>
    </div>
  );
};

export default SendTransaction;
