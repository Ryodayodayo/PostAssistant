import React, { useState } from 'react';

const LoginForm = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState(""); 

    const[idError, setIdError] = useState("");
    const[passwordError, setPasswordError] = useState("");

    const[isLoading, setIsLoading] = useState(false)

    //IDチェック関数
    const isValidId = (id : string) => {
        if (id == "a") {
            return "401";
        }
    };

    //パスワードチェック関数
    const isValidPassword = (password : string) => {
        if (password == "b") {
            return "401";
        }
    };


    const handleLogin = async () => {
        console.log('ID', id);
        console.log('password', password);

        // エラーチェック
        let hasError = false;

        if (!id) {
            setIdError ("IDを入力してください");
            hasError = true ;
        } else if (!isValidId (id)) {
            setIdError ("正しいIDを入力してください");
            hasError = true ;
        }

        if (!password) {
            setPasswordError ("パスワードを入力してください");
            hasError = true ;
        } else if (!isValidPassword (password)) {
            setPasswordError ("正しいパスワードを入力してください");
            hasError = true ;
        }

        // エラーがある時はreturn
        if (hasError) {
            return ;
        }

        // ローディング開始
        setIsLoading (true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert ("ログイン成功")
        } catch {
            alert ("ログイン失敗")
        } finally {
            setIsLoading (false);
        }
    };

    return (
        <div>
            <h1>ログイン</h1>

            <div className = "id">
                <label>ID</label>
                <input
                    className = "Form"
                    value = {id}
                    onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)} 
                    placeholder = "Your ID"
                    disabled={isLoading}
                 />
            </div>
            {idError && (
                <p className="text-red-500">{idError}</p>
            )}

            <div className = "password">
                <label>password</label>
                <input
                    className = "Form"
                    value = {password}
                    onChange = {(e: React.ChangeEvent<HTMLInputElement> ) =>setPassword(e.target.value)}
                    placeholder = "password"
                    disabled={isLoading}
                />
            {passwordError && (
                <p className="text-red-500">{passwordError}</p>
            )}
            </div>

            <button 
            onClick={handleLogin} 
            className = "button"
            disabled={isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
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