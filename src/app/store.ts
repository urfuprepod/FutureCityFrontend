import { configureStore } from "@reduxjs/toolkit";
import { documentsApi } from "src/entities/documents/api/rtk";
import { futureStatusApi } from "src/entities/main/api/rtk";
import { tagsApi } from "src/entities/tags/api/rtk";
import { userSlice } from "src/entities/Login/slice";
import { usersApi } from "src/entities/users/rtk";
import { authorsApi } from "src/entities/authors/api/rtk";

export const store = configureStore({
    reducer: {
        User: userSlice.reducer,
        [futureStatusApi.reducerPath]: futureStatusApi.reducer,
        [tagsApi.reducerPath]: tagsApi.reducer,
        [documentsApi.reducerPath]: documentsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [authorsApi.reducerPath]: authorsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(futureStatusApi.middleware)
            .concat(tagsApi.middleware)
            .concat(documentsApi.middleware)
            .concat(usersApi.middleware)
            .concat(authorsApi.middleware),
});

export const rtkHooks = {
    useGetFutureStatusesQuery: futureStatusApi.useGetFutureStatusesQuery,
    useGetTagsQuery: tagsApi.useGetTagsQuery,
    useSetTagMutation: tagsApi.useSetTagMutation,
    useGetDocumentsQuery: documentsApi.useGetDocumentsQuery,
    useAddDocumentMutation: documentsApi.useAddDocumentMutation,
    useGetUsersQuery: usersApi.useGetUsersQuery,
    useCreateUserMutation: usersApi.useCreateUserMutation,
    useChangeAdminStatusMutation: usersApi.useChangeAdminStatusMutation,
    useGetAuthorsQuery: authorsApi.useGetAuthorsQuery,
    useAddAuthorMutation: authorsApi.useAddAuthorMutation,
    useGetSingleAuthorQuery: authorsApi.useGetSingleAuthorQuery,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
