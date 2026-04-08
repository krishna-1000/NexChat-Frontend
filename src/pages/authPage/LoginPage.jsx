import React from 'react'
import LoginForm from '../../components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import {loginApi} from '../../api/auth/loginApi';

const LoginPage = () => {
    const navigate = useNavigate();
    const handleLogin = async (data) => {
        try {
            const res = await loginApi(data);
            if(res.status == 200){
                localStorage.setItem("token",res.data);
                console.log(localStorage.getItem("token"));
                navigate("/chat")
            }
            return res;
        } catch (error) {
            console.log(error.message);
        }

    }
    return (
        <div>
            <LoginForm onSubmit={handleLogin}/>
        </div>
    )
}

export default LoginPage
