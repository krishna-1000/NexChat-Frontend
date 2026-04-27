import React from 'react'
import SignUpForm from '../../components/auth/SignUpForm'
import {sendOtpApi, signUpApi} from '../../api/auth/signUpApi'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SingUpPage = () => {
    const navigate = useNavigate();

    const handleSignup = async (data) => {
        try {
            const response = await signUpApi(data);
            navigate("/login")
            toast.success("Signup successfully");
           
        } catch (error) {
            throw error
        }
    }
   
    return (
        
            <SignUpForm  onSubmitHandler={handleSignup} />
    )
}

export default SingUpPage
