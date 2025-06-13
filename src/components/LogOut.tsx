import { auth } from '../firebase';

const LogOut = () => {
  const handleLogout = () => {
    auth.signOut();
  };
  return (
    <div>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default LogOut;