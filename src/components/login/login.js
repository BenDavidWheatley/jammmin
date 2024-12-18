import React from 'react';
import Styles from './login.module.css';


function Login (props) {
    return (
        <div className={Styles.loginContainer}>
            <label className={Styles.loginHeader}>Input your client ID</label>
            <input  id='clientId' type='text' required></input>
            <input className={Styles.submitButton} type='submit' onClick={props.handleLogin}></input>
        </div>
    );
}

export default Login;
