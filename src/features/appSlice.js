import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: { 
    isMaintenance: false ,
    initialLoading : true
  },
  reducers: {
    setMaintenanceMode: (state, action) => {
      state.isMaintenance = action.payload;
    },
    setInitialLoading: (state, action) => {
      state.initialLoading = action.payload;
    }
  }
});

export const {setInitialLoading, setMaintenanceMode } = appSlice.actions;
export default appSlice.reducer;