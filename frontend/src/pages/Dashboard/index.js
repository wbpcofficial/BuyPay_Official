import React from "react";
import Top from "./Top";
import Card from "./Card";
import SendTransaction from "./SendTransaction";
import styles from "./index.module.scss";
const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Top />
      <div className={styles.cardContainer}>
        <div className={styles.flex}>
          <Card
            style={styles.address}
            title="Address"
            content="0x54801Fe588D76aA1663ac5B3B97c0A7fc18DCa70"
          />
          <Card style={styles.balance} title="Balance" content="0 ETH" />
          <Card style={styles.network} title="Network" content="" />
        </div>

        <div className={styles.flex}>
          <Card isCard={false} style={styles.sendTransaction}>
            <SendTransaction></SendTransaction>
          </Card>
          <Card isCard={false} style={styles.tokenList} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
