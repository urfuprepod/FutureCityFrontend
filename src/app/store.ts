import { configureStore } from "@reduxjs/toolkit";
import { documentsApi } from "src/entities/documents/api/rtk";
import { futureStatusApi } from "src/entities/main/api/rtk";
import { tagsApi } from "src/entities/tags/api/rtk";

export const store = configureStore({
    reducer: {
        [futureStatusApi.reducerPath]: futureStatusApi.reducer,
        [tagsApi.reducerPath]: tagsApi.reducer,
        [documentsApi.reducerPath]: documentsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(futureStatusApi.middleware)
            .concat(tagsApi.middleware)
            .concat(documentsApi.middleware),
});

export const rtkHooks = {
    useGetFutureStatusesQuery: futureStatusApi.useGetFutureStatusesQuery,
    useGetTagsQuery: tagsApi.useGetTagsQuery,
    useSetTagMutation: tagsApi.useSetTagMutation,
    useGetDocumentsQuery: documentsApi.useGetDocumentsQuery,
    useAddDocumentMutation: documentsApi.useAddDocumentMutation,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
