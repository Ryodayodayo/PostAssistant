import { ChangeEvent, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc, serverTimestamp} from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from "firebase/app";
import styles from './LoginForm.module.css';



const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event :React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
        console.error('メールアドレスまたはパスワードが入力されていません');
        return;
    }

    try {
    const userInformation = await createUserWithEmailAndPassword(auth, email, password);
    const user = userInformation.user;
    console.log('登録成功:', userInformation.user);
    alert ("ユーザー情報が登録されました");
    await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    createdAt: serverTimestamp()
  });
    console.log("データベースに登録完了");

    } catch (error) {

    console.error('登録エラー:', error);
    alert ("登録できません");
    }
  };

  
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <div className = {styles.page}>
      <div className = {styles.container}>
        <h1 className = {styles.h1}>ユーザー登録 </h1>
        <form onSubmit={handleSubmit} className = {styles.form}>
          <div>
            <label className = {styles.label}>メールアドレス</label>
            <input
              name="email"
              type="email"
              className = {styles.field}
              placeholder="email"
              value={email}
              onChange={(event) => handleChangeEmail(event)}
            />
          </div>
          <div>
            <label className = {styles.label}>パスワード</label>
            <input
              name="password"
              type="password"
              className = {styles.field}
              placeholder="password"
              value={password}
              onChange={(event) => handleChangePassword(event)}
            />
          </div>
          <button className = {styles.button}>登録</button>
        </form>
      </div>
    </div>
    
  );
};

export default SignUpForm;