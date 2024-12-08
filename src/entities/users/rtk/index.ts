import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlApi } from "src/app/application";
import { IUser, IUserBody } from "src/shared/types";
import { getCookie } from "typescript-cookie";

export const usersApi = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({
        baseUrl: urlApi + "users",
        prepareHeaders: (header) => {
            header.set('Authorization', 'Bearer ' + getCookie('token'))
        }
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getUsers: builder.query<{users: IUser[], totalPages: number}, undefined>({
            query: (query) => ({
                url: `/all?page=1`,
            }),
            providesTags: ["Users"],
        }),
        createUser: builder.mutation<IUser, IUserBody>({
            query: (body: IUserBody) => ({
                url: "/register",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Users"],
        }),
        changeAdminStatus: builder.mutation<IUser, number>({
            query: (id: number) => ({
                url: `/edit/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});
