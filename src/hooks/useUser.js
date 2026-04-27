import { useDispatch, useStore } from "react-redux";
import { createGroupApi, deleteGroupApi, exitFromGroupApi } from "../api/chat/groupApi";
import { deleteUserAccount, fetchUsersApi, updateUserAPi } from "../api/user/userApi";
import { fetchGroupsApi } from "../api/chat/groupApi";
import { appendGroup, setGroup, setGroupError, setGroupId, setGroupLoading, setGroupName } from "../features/chat/groupSlice";
import { setUserError, setUserLoading, setUsers } from "../features/user/userSlice";
import { setIsModalOpen } from "../features/modal/modalSlice";
import { getErrorMessage } from "../utils/errorResolver";
import { toast } from 'react-toastify'
import { asArray } from "../utils/dataResolver";
const useUser = () => {
    const dispatch = useDispatch();

    const getUsers = async () => {
        try {
            dispatch(setUserLoading(true))
            const response = await fetchUsersApi();

            const usersList = asArray(response.data);
            dispatch(setUsers(usersList));
            dispatch(setUserError(null));
        } catch (error) {
            dispatch(setUserError(error));
        } finally {
            dispatch(setUserLoading(false))
        }
    }
    const getGroups = async (id) => {
        try {
            dispatch(setGroupLoading(true))

            const response = await fetchGroupsApi(id);
            const groupList = asArray(response.data);

            dispatch(setGroup(groupList));
            dispatch(setGroupError(null))
        } catch (error) {
            dispatch(setGroupError(error))
            throw error
        } finally {
            setGroupLoading(false)
        }
    }
    const deleteGroup = async (id) => {
        try {
            const response = await deleteGroupApi(id)

            dispatch(setGroupError(null))
            return response.data;

        } catch (error) {
            dispatch(setGroupError(error))
            throw error
        }

    }
    const updateUser = async (data) => {
        try {
            dispatch(setUserLoading(true))
            const res = await updateUserAPi(data)
            
            localStorage.setItem("loginUserName", res.data.username);
            return res.data;

        } catch (error) {
            dispatch(setUserError(error))
            throw error
        } finally {
            dispatch(setUserLoading(false))
        }

    }
    const exitFromGroup = async (memberId, groupId) => {

        try {
            const response = await exitFromGroupApi(memberId, groupId)
            setGroupError(null)
            return response.data;

        } catch (error) {
            setGroupError(error)
            throw error
        }

    }
    const createGroup = async (formData) => {

        try {
            setGroupLoading(true)
            const response = await createGroupApi(formData);
            const { groupName, groupId, data } = response.data;

            if (groupId) {

                dispatch(setGroupName(response.data.groupName))
                dispatch(setGroupId(response.data.groupId))
                dispatch(appendGroup(response.data))

                dispatch(setIsModalOpen(false))
                setGroupError(null)
            } else {
                toast.error("Group id not valid")
            }

        } catch (error) {
            setGroupError(error)
            throw error
        } finally {
            setGroupLoading(false)
        }

    }
    const deleteAccount = (userId) => {

        try {
            if (userId) {
                const response = deleteUserAccount(userId);

                if (response) {
                    return response.data;
                }
            }


        } catch (error) {
            console.error(error);
        }

    }

    return {updateUser, getUsers, exitFromGroup, getGroups, deleteGroup, deleteAccount,createGroup };
}
export default useUser;