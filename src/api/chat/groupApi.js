import axiosInstance from "../axiosInstance";

export const fetchGroupApi = (id)=> axiosInstance.get(`/api/room/${id}`);
export const deleteGroupApi = (id)=>axiosInstance.delete(`/api/room/${id}`);
export const exitFromGroupApi = (memberId,groupId)=>axiosInstance.delete(`/api/room/${groupId}/${memberId}`);
export const createGroupApi = (data) => axiosInstance.post("api/room/group", data).then(r=>r.data);
