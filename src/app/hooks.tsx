import { useEffect } from "react";
import { fetchLogin, fetchLoginByToken } from "src/entities/Login/slice";
import { useAppDispatch, useAppSelector } from "src/shared/hooks";

export const useGetCurrentUser = () => {
    const { user, token, isLoading } = useAppSelector((state) => state.User);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(fetchLoginByToken());
        }
    }, []);

    return {user, token, isLoading}
};
