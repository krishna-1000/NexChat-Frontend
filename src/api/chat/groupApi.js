import axiosInstance from "../axiosInstance";

export const fetchGroupsApi = (id) => axiosInstance.get(`/api/groups/${id}`);
export const fetchGroupApi = (id) => axiosInstance.get(`/api/room/${id}`);
export const deleteGroupApi = (id) => axiosInstance.delete(`/api/room/${id}`);
export const exitFromGroupApi = (memberId, groupId) => axiosInstance.delete(`/api/room/${groupId}/${memberId}`);
export const createGroupApi = (data) => axiosInstance.post("api/groups", data);
export const summarizeGroupApi = (groupId) => axiosInstance.post(`/api/groups/${groupId}/summarize`, {}, { timeout: 30000 });
