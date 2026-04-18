import React from 'react'
import LoginForm from '../../components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../api/auth/loginApi';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async (data) => {
        try {
            const res = await loginApi(data);
            if (res.status == 200) {
                console.log(res.data)
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("loginUser", res.data.username);
                localStorage.setItem("loginUserId", res.data.id);
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
            <LoginForm onSubmit={handleLogin} />
        </div>
    )
}

export default LoginPage
