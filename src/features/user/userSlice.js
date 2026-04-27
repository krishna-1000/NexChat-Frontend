import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    loading: false,
    error: null
}
const userSlice = createSlice(
    {
        name: "user",
        initialState,
        reducers: {
            setUsers: (state, action) => {
                state.users = action.payload;
            },
            setUserLoading: (state, action) => {
                state.loading = action.payload;
            },
            setUserError: (state, action) => {
                state.loading = action.payload;
            }
            ,
            setLoginUser: (state, action) => {
                state.loginUser = action.payload;
            },

        }
    }
);

export const { setUsers, setUserLoading, setUserError } = userSlice.actions
export default userSlice.reducer