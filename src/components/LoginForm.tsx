import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css'


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event : React.FormEvent) => {
        event.preventDefault();

        if (!email || !password) {
            setError("メールアドレスとパスワードを入力してください");
            return;
        }
        setLoading(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("ログイン成功");
            alert ("ログインしました");

        } catch (error: any) {
            console.error("ログインエラー:", error);
            setError("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
        } finally {
            setLoading(false);
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
            <h1 className = {styles.h1}>ログイン</h1>
            <form onSubmit={handleSubmit} className = {styles.form}>
                <div>
                <label className = {styles.label}>メールアドレス</label>
                <input 
                name="email" 
                type="email" 
                className = {styles.field}
                value={email}
                placeholder="email" 
                disabled={loading}
                onChange={(event) => handleChangeEmail(event)}/>
                
                </div>
                <div>
                <label className = {styles.label}>パスワード</label>
                <input 
                name="password" 
                type="password" 
                className = {styles.field}
                placeholder="password" 
                value={password} 
                disabled={loading}
                onChange={(event) => handleChangePassword(event)}/>
                </div>

                {error && <p className={styles.errorMessage}>{error}</p>}

                <button className = {styles.button}>
                    {loading ? 'ログイン中...' : 'ログイン'}
                </button>
            </form>
        </div>
    </div>
  );
};

export default Login;


/*
const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    const[idError, setIdError] = useState("");
    const[passwordError, setPasswordError] = useState("");
    const[keyError, setKeyError] = useState("");

    const[isLoading, setIsLoading] = useState(false)

    // IDの入力処理
    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (idError) setIdError(""); 
        if (keyError) setKeyError(""); 
    }

    // パスワードの入力処理
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (passwordError) setPasswordError(""); 
        if (keyError) setKeyError(""); 
    };


    const handleLogin = async () => {
        // エラーチェック
        let hasError = false;

        if (!email) {
            setIdError ("IDを入力してください");
            hasError = true ;
        } 

        if (!password) {
            setPasswordError ("パスワードを入力してください");
            hasError = true ;
        } 

        // 空欄がある時はreturn
        if (hasError) {
            return ;
        }

        // ローディング開始
        setIsLoading (true);

        try {
            const response = await fetch('http://127.0.0.1:8787/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: email, password })
            })

            const data = await response.json();



            if (data.success) {
                alert (`ログイン成功   ID:${data.userId}`)
            } else {
                setKeyError(data.message); //IDかパスワードが間違ってたらエラーメッセージを格納
            }
            console.log(response.status);

        } catch {
            alert ("通信エラー")
        } finally {
            setIsLoading (false);
        }
    };

    return (
        <div className = {styles.container}>
            <h1>ログイン</h1>

            <div>
                <input
                    className = {styles.field}
                    value = {email}
                    onChange = {handleIdChange} 
                    placeholder = "ID"
                    disabled={isLoading}
                 />
                 {idError &&(
                    <p className={styles.errorMessage}>{idError}</p>
                 )}
            </div>

            <div>
                <input
                    className = {styles.field}
                    value = {password}
                    onChange = {handlePasswordChange}
                    placeholder = "password"
                    disabled={isLoading}
                />
                {passwordError &&(
                    <p className={styles.errorMessage}>{passwordError}</p>
                )}
            </div>

            {keyError && (
                <p className={styles.errorMessage}>{keyError}</p>
            )}

            <button 
            onClick={handleLogin} 
            className = {styles.button}
            disabled={isLoading}
            >
                {isLoading ? (
                    <div >
                        ログイン中...
                    </div>
                ) : (
                    <div>
                        ログイン                        
                    </div>
                )}
            </button>
        </div>

    );
};

export default LoginForm;
*/