import React from "react";
import Footer from "../../components/Footer";
import MainBg from "./MainBg";
import About from "./About";
import Description from "./Description";
import styles from "./index.module.scss";

const Home = () => {
  return (
    <div className={styles.homepage}>
      <MainBg />
      <About />
      <Description />
      <Footer />
    </div>
  );
};

export default Home;
