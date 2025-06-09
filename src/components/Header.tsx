import styles from "./Header.module.css"

const Header = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Post Assistant</h1>
      <h1 className={styles.h1}>MENU</h1>
    </div>
  );
};

export default Header;