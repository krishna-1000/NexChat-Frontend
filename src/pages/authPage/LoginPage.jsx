import React, { useState } from 'react'
import LoginForm from '../../components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../api/auth/loginApi';
import { useDispatch } from 'react-redux';
import { setProfileData } from '../../features/user/profileSlice';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState();
    const handleLogin = async (data) => {
        try {
            const res = await loginApi(data);
            if (res.status == 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("loginUserId", res.data.id);
                localStorage.setItem("loginUserName", res.data.username);
                localStorage.setItem("userBio", res.data.bio);
                localStorage.setItem("userEmail", res.data.email);
                localStorage.setItem("UserMemberSince", res.data.createdAt);
                
                
               
                dispatch(setProfileData({
                    loginUserName: res.data.username,
                    loginUserId: res.data.id,
                    userBio: res.data.bio,
                    token: res.data.token,
                    userEmail: res.data.email,
                    UserMemberSince: res.data.createdAt,
                }))

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
