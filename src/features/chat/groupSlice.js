import { createSlice } from "@reduxjs/toolkit";
import { createInitialState } from "../intialStateHelper";

const initialState = createInitialState({
    groupId: "",
    groups: [],
    groupChatMessages: {},
    groupName: "",
    selectedGroup: "",
    selectedGroupAdmin: ""
})
const groupSlice = createSlice({
    name: "group",
    initialState: initialState,
    reducers: {
        setGroupId: (state, action) => {
            state.groupId = action.payload
        },
        setGroupChatMessages: (state, action) => {
            const { roomId, messages } = action.payload;
            state.chatMessages[roomId] = messages;

        },
        setGroup: (state, action) => {
            if (action.payload) {
                action.payload.map((item, index) => {
                    const {groupId} = item;
                    state.groups[groupId] = item
                })
            }
        },
        appendGroup: (state, action) => {
            state.groups.push(action.payload);
        },
        setGroupName: (state, action) => {
            state.groupName = action.payload
        },
        setSelectedGroup: (state, action) => {
            state.selectedGroup = action.payload

        },
        setGroupAdmin: (state, action) => {
            state.selectedGroupAdmin = action.payload
        },
        setGroupError: (state, action) => {
            state.error = action.payload
        },
        setGroupLoading: (state, action) => {
            state.loading = action.payload
        },
    }
})

export const { setGroupChatMessages, setGroupError, setGroupLoading, setGroupId, setGroupAdmin, appendGroup, setGroup, setGroupName, setSelectedGroup } = groupSlice.actions
export default groupSlice.reducer