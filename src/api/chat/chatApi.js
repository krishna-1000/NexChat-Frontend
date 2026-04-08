import axiosInstance from "../axiosInstance";

export const fetchChatroom = (recieverId)=> axiosInstance.get(`/api/room/private/${recieverId}`);