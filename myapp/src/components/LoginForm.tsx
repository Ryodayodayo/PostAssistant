import React, { useState } from 'react';

const LoginForm = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState(""); 


    const handleLogin = () => {
        console.log('ID', id);
        console.log('password', password);
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
                 />
            </div>

            <div className = "password">
                <label>password</label>
                <input
                    className = "Form"
                    value = {password}
                    onChange = {(e: React.ChangeEvent<HTMLInputElement> ) =>setPassword(e.target.value)}
                    placeholder = "password"
                />
            </div>

            <button onClick={handleLogin} className = "button">
                ログイン
            </button>
        </div>

    );
};

export default LoginForm;