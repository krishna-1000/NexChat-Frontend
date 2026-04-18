import axiosInstance from "../axiosInstance";

export const fetchGroupsApi = (id) => axiosInstance.get(`/api/groups/${id}`).then(r => r.data).catch(e =>console.log(e));