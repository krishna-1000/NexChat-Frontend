import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
    type: null,
    data: []

}
const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        setIsModalOpen: (state, action) => {
            state.isModalOpen = action.payload
        },
        setType: (state, action) => {
            state.type = action.payload
        },
        setData: (state, action) => {
            console.log("warning of setting datat ")
            console.warn(action.payload)
            state.data = action.payload
            console.log("warning AGIM.... ")
            console.warn(state.data)
        }
    }
})
export const { setIsModalOpen,setData,setType } = modalSlice.actions
export default modalSlice.reducer