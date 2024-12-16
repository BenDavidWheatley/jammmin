import React from 'react';
import Styles from './login.module.css';








function Login (props) {
    return (
        <div>
           <label>Input your client ID</label>
           <input id='clientId'type='text'></input>
           <input type='submit' onClick={props.handleLogin}></input>
        </div>
    );
}

export default Login;
