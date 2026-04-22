import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginUserName: "",
    loginUserId: "",
    userBio: "",
    token: "",
    userEmail: "",
    UserMemberSince: "",



}
const profileSlice = createSlice(
    {
        name: "profile",
        initialState,
        reducers: {
            setProfileData: (state, action) => {
                const { loginUserName, loginUserId, userBio, token, userEmail, UserMemberSince } = action.payload
                state.loginUserName = loginUserName
                state.loginUserId = loginUserId
                state.userBio = userBio
                state.token = token
                state.userEmail = userEmail
                state.UserMemberSince = UserMemberSince

            },
            deleteProfileData: (state, action) => {
                state = initialState
            }


        }
    }
);

export const { setProfileData, deleteProfileData } = profileSlice.actions
export default profileSlice.reducer