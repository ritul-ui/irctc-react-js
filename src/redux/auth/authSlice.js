import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginWithGoogle,
  registerWithEmail,
  loginWithEmail,
} from "../../services/authServices";

export const loginWithGoogleAsync = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, thunkAPI) => {
    const response = await loginWithGoogle();
    if (response.status === 200) {
      return response.user;
    } else {
      return thunkAPI.rejectWithValue(response.error);
    }
  }
);

export const registerWithEmailAsync = createAsyncThunk(
  "auth/registerWithEmail",
  async ({ fullName, email, password }, thunkAPI) => {
    const response = await registerWithEmail({ fullName, email, password });
    console.log("response from registerWithEmailAsync:", response);
    if (response.status === 200) {
      return response.user;
    } else {
      return thunkAPI.rejectWithValue(response.error);
    }
  }
);

export const loginWithEmailAsync = createAsyncThunk(
  "auth/loginWithEmail",
  async ({ email, password }, thunkAPI) => {
    const response = await loginWithEmail(email, password);
    console.log("response from loginWithEmailAsync:", response);
    if (response.status === 200) {
      return response.user;
    } else {
      return thunkAPI.rejectWithValue(response.error);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoginOpen: false,
    isRegisterOpen: false,
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
    isInitialized: false,
  },

  reducers: {
    toggleLoginModal: (state) => {
      state.isLoginOpen = !state.isLoginOpen;
      if (state.isLoginOpen) {
        state.isRegisterOpen = false;
      }
      state.error = null;
    },

    toggleRegisterModal: (state) => {
      state.isRegisterOpen = !state.isRegisterOpen;
      if (state.isRegisterOpen) {
        state.isLoginOpen = false;
      }
      state.error = null;
    },

    openLoginModal: (state) => {
      state.isLoginOpen = true;
      state.isRegisterOpen = false;
      state.error = null;
    },

    openRegisterModal: (state) => {
      state.isRegisterOpen = true;
      state.isLoginOpen = false;
      state.error = null;
    },

    closeModals: (state) => {
      state.isLoginOpen = false;
      state.isRegisterOpen = false;
      state.error = null;
    },

    // For Firebase auth state changes
    setAuthState: (state, action) => {
      const user = action.payload;
      if (user) {
        state.isLoggedIn = true;
        state.user = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
      } else {
        state.isLoggedIn = false;
        state.user = null;
      }
      state.isInitialized = true;
      state.loading = false;
    },

    clearError: (state) => {
      state.error = null;
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginWithGoogleAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginWithGoogleAsync.fulfilled, (state, action) => {
          state.isLoggedIn = true;
          state.isLoginOpen = false;
          state.isRegisterOpen = false;
          state.user = action.payload;
          state.loading = false;
          state.error = null;
          state.isLoginOpen = false;
        })
        .addCase(loginWithGoogleAsync.rejected, (state, action) => {
          state.isLoggedIn = false;
          state.isLoginOpen = false;
          state.isRegisterOpen = false;
          state.user = null;
          state.isLoginOpen = false;
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(registerWithEmailAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerWithEmailAsync.fulfilled, (state, action) => {
          state.isLoggedIn = true;
          state.isLoginOpen = false;
          state.isRegisterOpen = false;
          state.user = action.payload;
          state.loading = false;
          state.error = null;
          state.isLoginOpen = false;
        })
        .addCase(registerWithEmailAsync.rejected, (state, action) => {
          state.isLoggedIn = false;
          state.isLoginOpen = false;
          state.isRegisterOpen = false;
          state.user = null;
          state.isLoginOpen = false;
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(loginWithEmailAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginWithEmailAsync.fulfilled, (state, action) => {
          state.isLoggedIn = true;
          state.isLoginOpen = false;
          state.isRegisterOpen = false;
          state.user = action.payload;
          state.loading = false;
          state.error = null;
          state.isLoginOpen = false;
        })
        .addCase(loginWithEmailAsync.rejected, (state, action) => {
          state.isLoggedIn = false;
          state.isLoginOpen = false;
          state.isRegisterOpen = false;
          state.user = null;
          state.isLoginOpen = false;
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(logoutAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(logoutAsync.fulfilled, (state) => {
          state.isLoggedIn = false;
          state.user = null;
          state.loading = false;
          state.isLoginOpen = false;
          state.isRegisterOpen = false;
          state.error = null;
        })
        .addCase(logoutAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  },
});

export const {
  toggleLoginModal,
  toggleRegisterModal,
  openLoginModal,
  openRegisterModal,
  closeModals,
  setAuthState,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
