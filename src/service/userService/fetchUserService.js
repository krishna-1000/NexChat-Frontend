import { fetchUsersApi } from '../../api/user/userApi';
import {setLoading,setUser,setError} from '../../features/user/userSlice'
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