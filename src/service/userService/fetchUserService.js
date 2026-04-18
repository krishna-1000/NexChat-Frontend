import { fetchGroupsApi } from '../../api/user/fetchGroupsApi';
import { fetchUsersApi } from '../../api/user/userApi';
import { setGroup } from '../../features/chat/groupSlice';
import { setLoading, setUser, setError } from '../../features/user/userSlice'
const fetchUserService = async (dispatch) => {

    try {
        dispatch(setLoading(true))
        const response = await fetchUsersApi();
        console.log(await response);
        dispatch(setUser(await response));
    } catch (e) {
        dispatch(setError(e.message + "User Loading Failed"));
    } finally {
        dispatch(setLoading(false))
    }

}

export default fetchUserService;

export const fetchGroupService = async (dispatch,id) => {

    try {
        const response = await fetchGroupsApi(id);
        console.log(await response);
        dispatch(setGroup(await response));

    } catch (error) {
        console.error(error)
    }

}