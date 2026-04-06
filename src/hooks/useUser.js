import { useDispatch, useStore } from "react-redux";
import fetchUserService from "../service/userService/fetchUserService";

const useUser = () => {
    const dispatch = useDispatch();

    const getUsers = () => {
        fetchUserService(dispatch);
    }

    return { getUsers };
}
export default useUser;