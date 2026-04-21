import React, { useState } from 'react'
import LoginForm from '../../components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../api/auth/loginApi';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error,setError] = useState();
    const handleLogin = async (data) => {
        try {
            const res = await loginApi(data);
            if (res.status == 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("loginUser", res.data.username);
                localStorage.setItem("loginUserId", res.data.id);
                
                navigate("/chat")
            }
            return res;
        } catch (error) {

            console.error(error)
        }

    }
    return (
        <div>
            <LoginForm onSubmit={handleLogin} />
        </div>
    )
}

export default LoginPage
