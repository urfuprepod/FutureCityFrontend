import React, { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { authors } from "src/shared/constants";
import { ErrorTitle } from "src/shared/UI";

const AuthorProfile = () => {
    const { id } = useParams();

    const author = useMemo(() => {
        const current = authors.find((el) => !id || el.id === +id);
        if (!current) return undefined;
        return current;
    }, [authors]);

    if (!author) return <ErrorTitle>Автор не найден!</ErrorTitle>;
    return <div>AuthorProfile</div>;
};

export default AuthorProfile;
