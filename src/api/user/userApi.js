import axiosInstance from "../axiosInstance"

export const getUserList = ()=>{
    return axiosInstance.get("/api/users");

}