import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlApi } from "src/app/application";
import { ICityFuture } from "src/shared/types";

export const futureStatusApi = createApi({
    reducerPath: "futureStatus",
    baseQuery: fetchBaseQuery({
        baseUrl: urlApi + "status",
    }),
    tagTypes: ["Statuses"],
    endpoints: (builder) => ({
        getFutureStatuses: builder.query<ICityFuture[], undefined>({
            query: () => ({
                url: "/all",
            }),
            providesTags: ["Statuses"],
        }),
    }),
});
