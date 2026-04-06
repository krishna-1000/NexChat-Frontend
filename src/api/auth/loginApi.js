import React from 'react'
import axiosInstance from '../axiosInstance'

export const loginApi = (data) => axiosInstance.post("/api/auth/login", data);

