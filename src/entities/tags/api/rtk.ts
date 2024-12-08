import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlApi } from "src/app/application";
import { ITag, ITagBody } from "src/shared/types";

export const tagsApi = createApi({
    reducerPath: "tags",
    baseQuery: fetchBaseQuery({
        baseUrl: urlApi + "tags",
    }),
    tagTypes: ["Tags"],
    endpoints: (builder) => ({
        getTags: builder.query<ITag[], string | undefined>({
            query: (query) => ({
                url: `/current${(query && `?status=${query}`) || ""}`,
            }),
            providesTags: ["Tags"],
        }),
        setTag: builder.mutation<ITag, ITagBody>({
            query: (body: ITagBody) => ({
                url: "/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Tags"],
        }),
    }),
});
