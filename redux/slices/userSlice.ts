import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  role: string;
  dealerId: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  email: '',
  role: '',
  dealerId: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.dealerId = action.payload.dealerId;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.email = '';
      state.role = '';
      state.dealerId = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;