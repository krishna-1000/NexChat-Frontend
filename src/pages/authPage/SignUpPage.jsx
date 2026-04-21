import React from 'react'
import SignUpForm from '../../components/auth/SignUpForm'
import {signUpApi} from '../../api/auth/signUpApi'
import { useNavigate } from 'react-router-dom';

const SingUpPage = () => {
    const navigate = useNavigate();

    const handleSignup = async (data) => {
        try {
            const response = await signUpApi(data);
            navigate("/login")
            return response
        } catch (error) {
            console.log(error.message)
             throw new Error(error.response?.data|| "Signup failed");
        }
    }
    return (
        
            <SignUpForm onSubmitHandler={handleSignup} />
    )
}

export default SingUpPage
