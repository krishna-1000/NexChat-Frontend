
import React from 'react'
import axiosInstance from '../axiosInstance'

const signUpApi = (data) => {
    return axiosInstance.post("api/auth/signup", data)
}

export default signUpApi

