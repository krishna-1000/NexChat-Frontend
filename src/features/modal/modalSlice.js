import { createSlice } from "@reduxjs/toolkit";
import { createInitialState } from "../intialStateHelper";

const initialState = createInitialState({
    isModalOpen: false,
    type: null,
    data: []

})
const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        setIsModalOpen: (state, action) => {
            state.isModalOpen = action.payload
        },
        clearModal: (state, action) => {
            state.isModalOpen = false
            state.type = null
            state.data = []
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
        },
        setModalError: (state, action) => {
            state.error = action.payload
        },
        setModalLoading: (state, action) => {
            state.loading = action.payload
        },
    }
})
export const {clearModal, setModalError, setModalLoading, setIsModalOpen, setData, setType } = modalSlice.actions
export default modalSlice.reducer