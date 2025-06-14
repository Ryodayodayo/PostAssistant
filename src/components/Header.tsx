import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../contexts/AuthContext';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    alert ("ログアウトしました");
  };

  const goToLogin = () => navigate("/login");
  const goToSignup = () => navigate("/signup");

  if (loading) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Post Assistant</h1>
      <div className={styles.buttons}>
        {user ? (
          <button onClick={handleLogout}>ログアウト</button>
        ) : (
          <>
            <button onClick={goToLogin}>ログイン</button>
            <button onClick={goToSignup}>サインアップ</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
