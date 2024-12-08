import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RestInstanse } from "src/app/axiosInstance";
import { IUser } from "src/shared/types";
import { getCookie, setCookie, removeCookie } from "typescript-cookie";

type InitialState = {
    user?: IUser;
    isLoading: boolean;
    token: string;
};

const initialState: InitialState = {
    user: undefined,
    isLoading: false,
    token: "",
};

type ResponseType = {
    user: IUser;
    token: string;
};

export const fetchLogin = createAsyncThunk(
    "asyncGetUser",
    async (body: any) => {
        const response = await RestInstanse.post<ResponseType>(`login`, body);
        const data: ResponseType = response.data;

        return data;
    }
);

export const fetchRegister = createAsyncThunk(
    "asyncRegisterUser",
    async (body: any) => {
        const response = await RestInstanse.post<ResponseType>(
            `register`,
            body
        );
        const data: ResponseType = response.data;

        return data;
    }
);

export const fetchLoginByToken = createAsyncThunk(
    "asyncTokenUser",
    async () => {
        const response = await RestInstanse.get<ResponseType>(`current`);
        const data: ResponseType = response.data;

        return data;
    }
);

export const userSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        logout(state) {
            state.user = undefined;
            state.token = "";
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            setCookie("token", action.payload.token);
            state.isLoading = false;
        });

        builder.addCase(fetchLogin.rejected, (state) => {
            state.user = undefined;
            state.isLoading = false;
            state.token = "";
            removeCookie("token");
        });

        builder.addCase(fetchLogin.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
        });

        builder.addCase(fetchRegister.rejected, (state) => {
            state.user = undefined;
            state.isLoading = false;
        });

        builder.addCase(fetchRegister.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchLoginByToken.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
            state.token = action.payload.token;
        });

        builder.addCase(fetchLoginByToken.rejected, (state) => {
            state.user = undefined;
            state.isLoading = false;
        });

        builder.addCase(fetchLoginByToken.pending, (state) => {
            state.isLoading = true;
        });
    },
});
