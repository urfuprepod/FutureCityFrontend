import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlApi } from "src/app/application";
import { parseJson } from "src/shared/methods";
import { ICityFuture } from "src/shared/types";

export const futureStatusApi = createApi({
    reducerPath: "futureStatus",
    baseQuery: fetchBaseQuery({
        baseUrl: urlApi + "status",
    }),
    tagTypes: ["Statuses"],
    endpoints: (builder) => ({
        getFutureStatuses: builder.query<
            { label: string; value: number; id: number }[],
            undefined
        >({
            query: () => ({
                url: "/all",
                async responseHandler(response) {
                    const json = await response.text();
                    const data = parseJson<ICityFuture[]>(json);
                    return data.map((el) => ({
                        value: el.id,
                        label: el.name,
                        id: el.id,
                    }));
                },
            }),
            providesTags: ["Statuses"],
        }),
    }),
});
