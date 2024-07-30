import { apiUrls, baseUrl, tokenAccess } from "@/config/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../hooks";
import { IErrorResponse } from "../types/auth";

const getToken = () => {
  return localStorage.getItem(tokenAccess.tokenName) || "";
};

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

let interceptor = 0;

const setupAxiosInterceptors = (
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  interceptor = axiosInstance.interceptors.request.use(
    async config => {
      try {
        const token = getToken();
        if (!token) {
          dispatch(logOutAsync());
        } else if (isTokenAboutToExpire()) {
          dispatch(logOutAsync());
        } else {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      } catch (error) {
        return Promise.reject(error);
      }
      return config;
    },
  );
};

const isTokenAboutToExpire = (extraTimeInSeconds = 30) => {
  const token = getToken();
  if (!token) {
    return true;
  }
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  const expirationTime = decodedToken.exp;
  if (expirationTime !== undefined) {
    return expirationTime - currentTime <= extraTimeInSeconds;
  } else {
    return true;
  }
};

const validateToken = async () => {
  if (!getToken()) {
    return false;
  }
  return true;
};

export const setRedirect = createAsyncThunk(
  "redirect/set",
  async (redirect: string) => {
    return { redirect };
  }
);

export const resetRedirect = createAsyncThunk("redirect/reset", async () => {
  return {};
});

const deleteAccess = async () => {
  try {
    localStorage.removeItem(tokenAccess.tokenName);
  } catch (error) {
    console.log(error)
  }
  }

export const getUserAsync = createAsyncThunk(
  "auth/getUserAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(apiUrls.getUser());
      if (response.data.ok) {
        return response.data;
      } else {
        return rejectWithValue("error");
      }
    } catch (error) {
      deleteAccess();
      return rejectWithValue("error");
    }
  }
);

export const logInAsync = createAsyncThunk(
  "auth/logInAsync",
  async (
    {
      data,
      setActive,
      setError,
      dispatch,
    }: {
      data: {
        email: string;
        password: string;
      };
      setActive: (boolean: boolean) => void;
      setError: (error: string) => void;
      dispatch: ReturnType<typeof useAppDispatch>;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(apiUrls.logIn(), data);
      if (response.data.ok) {
        localStorage.setItem(tokenAccess.tokenName, response.data.token);
        setupAxiosInterceptors(dispatch);
        setActive(false);
        console.log("Sesión iniciada correctamente");
        dispatch(getUserAsync());
        dispatch(setRedirect("/home"))
        return {};
      } else {
        setError(response.data.message);
        return rejectWithValue("error");
      }
    } catch (error) {
      setActive(false);
      const message =
        (error as IErrorResponse).response.data.message ||
        "Error al iniciar sesión";
      setError(message);
      return rejectWithValue("error");
    }
  }
);


export const verifySessionAsync = createAsyncThunk(
  "auth/verifySessionAsync",
  async (
    {
      dispatch,
    }: {
      dispatch: ReturnType<typeof useAppDispatch>;
    },
    { rejectWithValue }
  ) => {
    if (!(await validateToken())) {
      await deleteAccess();
      return rejectWithValue("error");
    }
    try {
      await dispatch(getUserAsync());
      return {};
    } catch (error) {
      await deleteAccess();
      return rejectWithValue("error");
    }
  }
);

export const logOutAsync = createAsyncThunk(
  "auth/logOutAsync",
  async (_, { rejectWithValue }) => {
    try {
      await deleteAccess();
      return {};
    } catch (error) {
      rejectWithValue("error");
    }
  }
);

export const uploadAvatarAsync = createAsyncThunk(
  "auth/uploadAvatarAsync",
  async (file: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.put(apiUrls.uploadAvatar(), file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.ok) {
        console.log("Avatar actualizado");
        return response.data.user.avatar;
      } else {
        console.log("Error al actualizar avatar");
        return rejectWithValue("error");
      }
    } catch (error) {
      console.log("Error al actualizar avatar");
      return rejectWithValue("error");
    }
  }
);