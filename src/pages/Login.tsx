import React, { useState } from 'react';
import Header from '../components/Header'
import LoginForm from '../components/LoginForm'
import styles from "./Login.module.css"

const Login = () => {

    return (
        <div className = {styles.container}>
            <LoginForm />
        </div>

    );
};

export default Login;

