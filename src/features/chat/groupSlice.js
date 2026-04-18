import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    groupId: "",
    groups: [],
    groupName: "",
    selectedGroup: "",
    selectedGroupAdmin: ""
}
const groupSlice = createSlice({
    name: "group",
    initialState: initialState,
    reducers: {
        setGroupId: (state, action) => {
            state.groupId = action.payload
        },
        setGroup: (state, action) => {
            state.groups = action.payload
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
    }
})

export const { setGroupId, setGroupAdmin, appendGroup, setGroup, setGroupName, setSelectedGroup } = groupSlice.actions
export default groupSlice.reducer