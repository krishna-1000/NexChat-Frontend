import { useDispatch, useStore } from "react-redux";
import fetchUserService, { fetchGroupService } from "../service/userService/fetchUserService";
import { deleteGroupApi, exitFromGroupApi } from "../api/chat/groupChatApi";

const useUser = () => {
    const dispatch = useDispatch();

    const getUsers = () => {
        fetchUserService(dispatch);
    }
    const getGroups = (id) => {
        fetchGroupService(dispatch, id)
    }
    const deleteGroup = async (id) => {
        const response = await deleteGroupApi(id)

        return response.data;
    }
    const exitFromGroup = async (memberId,groupId) => {
        const response = await exitFromGroupApi(memberId,groupId)

        return response.data;
    }

    return { getUsers,exitFromGroup, getGroups, deleteGroup };
}
export default useUser;