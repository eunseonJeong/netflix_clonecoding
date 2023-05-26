import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../axios/api";
import { cookies } from "../../shared/cookies";

const initialState = {
  signup: {
    email: "",
    password: "",
    isLogin: false,
    isLoading: cookies.get("token") ? true : false,
    isError: null,
  },
};

export const __signUp = createAsyncThunk(
  "SIGN_UP",
  async (payload, thunkAPI) => {
    try {
      await instance.post("/user/signup", payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __login = createAsyncThunk("LOGIN", async (payload, thunkAPI) => {
  try {
    const data = await instance.post("/user/login", payload);
    cookies.set("token", data.headers.authorization, { path: "/" });
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(payload);
  }
});

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
      cookies.remove("token");
    },
  },
});

export default signupSlice.reducer;
