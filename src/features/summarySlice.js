import { createSlice } from '@reduxjs/toolkit'
import React, { act } from 'react'
import { createInitialState } from '../features/intialStateHelper'

const initialState = createInitialState({
    summary:"",
    remainingChances:10

})
const summerizeSlice = createSlice({
    name: "summary",
    initialState: initialState,
    reducers: {
        setSummary: (state, action) => {
            state.summary = action.payload
        },    
        setRemainingChances: (state, action) => {
            state.remainingChances = action.payload
        },    
        setSummaryLoading: (state, action) => {
            state.loading = action.payload
        },
        setSummayError: (state, action) => {
            state.error = action.payload
        },

    }
})

export const {setRemainingChances,setSummary,setSummaryLoading,setSummayError} = summerizeSlice.actions
export default summerizeSlice.reducer;

