import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import Switch from "react-switch";
import styles from "./index.module.scss";

const addressOption = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const typeOption = [
  { value: "eth", label: "ETH - Ethereum" },
  { value: "wbpc", label: "BuyPay - Token" },
];
const SendTransaction = () => {
  const [advancedToggle, setAdvancedToggle] = useState(false);

  const handleAdvancedToggle = () => {
    setAdvancedToggle(!advancedToggle);
  };

  const handleAddressChange = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  const handleAddressInputChange = (inputValue, actionMeta) => {
    // console.group("Input Changed");
    // console.log(inputValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };

  const handleTypeChange = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  const handleTypeInputChange = (inputValue, actionMeta) => {
    // console.group("Input Changed");
    // console.log(inputValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
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
            <span className={styles.entireBalance}>Entire Balane</span>
          </div>
          <input type="number" />
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
        <div className={styles.submitBtn}>
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
