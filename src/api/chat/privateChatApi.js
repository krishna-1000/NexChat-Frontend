import axiosInstance from "../axiosInstance";

export const fetchPrivateRoomApi = (recieverId)=> axiosInstance.get(`/api/chat/private/${recieverId}`);