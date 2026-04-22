import { useDispatch, useStore } from "react-redux";
import fetchUserService, { fetchGroupService } from "../service/userService/fetchUserService";
import { deleteGroupApi, exitFromGroupApi } from "../api/chat/groupChatApi";
import { deleteUserAccount } from "../api/user/userApi";

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
    const deleteAccount = (userId)=>{
        const response = deleteUserAccount(userId);
        console.log(response.data)
        return response.data;
    }

    return { getUsers,exitFromGroup, getGroups, deleteGroup,deleteAccount };
}
export default useUser;