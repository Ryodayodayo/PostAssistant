import React, { useState } from 'react';
import styles from './LoginForm.module.css'

const LoginForm = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState(""); 

    const[idError, setIdError] = useState("");
    const[passwordError, setPasswordError] = useState("");
    const[keyError, setKeyError] = useState("");

    const[isLoading, setIsLoading] = useState(false)

    // IDの入力処理
    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
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

        if (!id) {
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
                body: JSON.stringify({ id, password })
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
        <div>
            <h1>ログイン</h1>

            <div className = {styles.container}>
                <input
                    className = {styles.field}
                    value = {id}
                    onChange = {handleIdChange} 
                    placeholder = "ID"
                    disabled={isLoading}
                 />
                 {idError &&(
                    <p className={styles.errorMessage}>{idError}</p>
                 )}
            </div>

            <div className = {styles.container}>
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