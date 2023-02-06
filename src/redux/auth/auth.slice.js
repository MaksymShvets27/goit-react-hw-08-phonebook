const { createSlice } = require('@reduxjs/toolkit');
const {
  loginUser,
  singupUser,
  logoutUser,
  refreshUser,
} = require('./auth.thunk');

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.isLoggedIn = true;
        state.token = token;
        state.user = user;
      })
      .addCase(singupUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.isLoggedIn = true;
        state.token = token;
        state.user = user;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      }),
});

export default authSlice.reducer;
