import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlApi } from "src/app/application";
import { IDocument, IDocumentBody } from "src/shared/types";

export const documentsApi = createApi({
    reducerPath: "documents",
    baseQuery: fetchBaseQuery({
        baseUrl: urlApi + "documents",
    }),
    tagTypes: ["Documents"],
    endpoints: (builder) => ({
        getDocuments: builder.query<IDocument[], undefined>({
            query: () => ({
                url: ``,
            }),
            providesTags: ["Documents"],
        }),
        addDocument: builder.mutation<IDocument, FormData>({
            query: (body: FormData) => ({
                url: "/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Documents"],
        }),
    }),
});
