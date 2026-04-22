import axiosInstance from "../axiosInstance";

export const fetchPrivateRoomApi = (recieverId)=> axiosInstance.get(`/api/room/private/${recieverId}`);