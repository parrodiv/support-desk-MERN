import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  user: 'Ale',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  console.log(user);
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //allow us to add cases builder.addCase e.g.(register, pending, fulfilled ...) and how do we want to change the state when the register is fulfilled 

  }
})

export default authSlice.reducer