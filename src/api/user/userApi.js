import axiosInstance from "../axiosInstance"

export const fetchUsersApi = () => axiosInstance.get("/api/users").then(r => r.data).catch(e =>console.log(e));
export const deleteUserAccount = (userId) => axiosInstance.delete(`/api/user/delete/${userId}`).then(r => r.data).catch(e =>console.log(e));
