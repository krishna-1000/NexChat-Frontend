import React from 'react'
import axiosInstance from '../axiosInstance'

const loginApi = (data) => {
    return axiosInstance.post("/api/auth/login",data);
}

export default loginApi
