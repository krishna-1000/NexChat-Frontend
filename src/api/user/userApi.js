import axiosInstance from "../axiosInstance"

export const fetchUsersApi = () => axiosInstance.get("/api/users");
export const deleteUserAccount = (userId) => axiosInstance.delete(`/api/user/delete/${userId}`);
export const updateUserAPi = (data) => axiosInstance.put('/api/user',data);
