import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlApi } from "src/app/application";
import { IAuthor } from "src/shared/types";

export const authorsApi = createApi({
    reducerPath: "authors",
    baseQuery: fetchBaseQuery({
        baseUrl: urlApi + "authors",
    }),
    tagTypes: ["Authors"],
    endpoints: (builder) => ({
        getAuthors: builder.query<IAuthor[], undefined>({
            query: () => ({
                url: "/all",
            }),
            providesTags: ["Authors"],
        }),
        getSingleAuthor: builder.query<IAuthor, number>({
            query: (id: number) => ({
                url: `/one/${id}`,
            }),
        }),
        addAuthor: builder.mutation<IAuthor, FormData>({
            query: (body: FormData) => ({
                url: "/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Authors"],
        }),
    }),
});
