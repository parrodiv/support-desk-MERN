import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //allow us to add cases builder.addCase e.g.(register, pending, fulfilled ...) and how do we want to change the state when the register is fulfilled 

  }
})

export default authSlice.reducer