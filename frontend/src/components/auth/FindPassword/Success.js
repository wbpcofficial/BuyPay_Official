import styles from "./style.module.scss";

const Success = ({ history }) => {
  const gotoLogin = () => {
    history.push("/login");
  };
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Card}>
          <div className={styles.LoginIcon}>
            <img src="../assets/icons/passwordChanged.png" />
          </div>
          <div className={styles.Title}>
            Success Change<strong> &nbsp;Password!</strong>
          </div>
          <div className={styles.SubTitle}>
            You can login with the changed password Now
          </div>
          <button className={styles.LoginBtn} onClick={gotoLogin}>
            <div className={styles.Text}>Go to Login</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Success;
