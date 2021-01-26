import styles from "./style.module.scss";

const Message = (props) => {
  return (
    <div className={styles.MessageContainer}>
      <div className={styles.Text}>
        We've just sent reset password link to your email address. <br />
        <strong>{props.location.state.email}</strong>
      </div>
    </div>
  );
};

export default Message;
