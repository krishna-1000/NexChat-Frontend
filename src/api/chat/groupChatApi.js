import axiosInstance from "../axiosInstance";

export const fetchGroup = (id)=> axiosInstance.get(`/api/room/${id}`);
export const deleteGroupApi = (id)=>axiosInstance.delete(`/api/room/${id}`);
export const exitFromGroupApi = (memberId,groupId)=>axiosInstance.delete(`/api/room/${groupId}/${memberId}`);