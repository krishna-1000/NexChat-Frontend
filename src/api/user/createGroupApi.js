import axiosInstance from "../axiosInstance";

export const createGroupApi = (data) => axiosInstance.post("api/room/group", data).then(r=>r.data);
