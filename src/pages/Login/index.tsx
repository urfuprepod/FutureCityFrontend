import React, { FC, useMemo } from "react";
import { Flex, Title1 } from "src/shared/UI";
import Form from "src/Widgets/Form";
import {
    loginColumns,
    registrationColumns,
} from "src/entities/Login/constants";
import { fetchLogin, fetchRegister } from "src/entities/Login/slice";
import { useAppDispatch } from "src/shared/hooks";

type Props = {
    isRegistry: boolean;
};
const LoginPage: FC<Props> = (props) => {
    const { isRegistry } = props;
    const dispatch = useAppDispatch();

    const config = useMemo(() => {
        return {
            name: isRegistry ? "Регистрация" : "Авторизация",
            columns: isRegistry ? registrationColumns : loginColumns,
            onSubmit: isRegistry ? fetchRegister : fetchLogin,
            buttonTitle: isRegistry ? 'Зарегистрироваться' : 'Войти'
        };
    }, [isRegistry]);

    return (
        <Flex $isVertical gap={20}>
            <Title1>{config.name}</Title1>

            <Form
                onSubmit={async (data) => {
                    dispatch(config.onSubmit(data));
                }}
                buttonTitle={config.buttonTitle}
                fields={config.columns}
            />
        </Flex>
    );
};

export default LoginPage;
