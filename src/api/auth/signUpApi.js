
import React from 'react'
import axiosInstance from '../axiosInstance'

export const signUpApi = (data) => axiosInstance.post("api/auth/signup", data);
export const sendOtpApi = (data) => axiosInstance.post("api/auth/send-otp", data);
export const verifyOtpApi= (data) => axiosInstance.post("api/auth/verify-otp", data);


