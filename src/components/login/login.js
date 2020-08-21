import React, {useContext} from 'react';
import './login.scss';
import {Button} from '@material-ui/core';
import {auth, provider} from "../../firebase/firebase";
import {UserContext} from "../../context/user-context/user-context";

const Login = () => {
    const {setUser} = useContext(UserContext)

    const login = async() => {
        try {
            const res = await auth.signInWithPopup(provider);
            setUser(res.user)
        }
        catch (err) {
            alert(err)
        }
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src={require('../../assets/whatsapp-icon.png')} alt="Whatsapp" className="login__icon"/>
                <h1 className="login__title">Sign in To WhatsApp</h1>
                <Button onClick={login} className="login__button" color={"primary"} size={'large'} variant={"contained"}>signin with google</Button>
            </div>

        </div>
    );
};

export default Login;