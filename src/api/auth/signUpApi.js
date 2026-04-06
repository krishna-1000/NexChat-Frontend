
import React from 'react'
import axiosInstance from '../axiosInstance'

export const signUpApi = (data) => axiosInstance.post("api/auth/signup", data);


