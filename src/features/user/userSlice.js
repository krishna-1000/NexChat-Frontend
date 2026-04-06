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
            setUser: (state, action) => {
                state.users = action.payload;
            },
            setLoading: (state, action) => {
                state.loading = action.payload;
            },
            setError: (state, action) => {
                state.loading = action.payload;
            }

        }
    }
);

export const { setUser,setLoading,setError } = userSlice.actions
export default userSlice.reducer