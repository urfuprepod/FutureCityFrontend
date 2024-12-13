import { FC, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "src/assets/logo.jpg";
import NoAvatar from "src/assets/no-avatar.jpg";
import { logout } from "src/entities/Login/slice";
import { useAppDispatch } from "src/shared/hooks";
import styles from "./styles.module.css";

import { IUser } from "src/shared/types";
import DropdownComponent from "../DropdownComponent";
import { Flex } from "src/shared/UI";

type Props = {
    user: IUser | undefined;
};
const HeaderPanel: FC<Props> = ({ user }) => {
    // const { user } = useGetCurrentUser();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const config = useMemo(() => {
        const links = [
            {
                name: "Зарегистрироваться",
                onClick: () => navigate("/register"),
            },
            { name: "Логин", onClick: () => navigate("/login") },
            {
                name: "Выйти",
                onClick: () => {
                    dispatch(logout());
                    navigate("/login");
                },
            },
        ];
        if (!user) return { login: "Аноним", links: links.slice(0, -1) };

        return { login: user.login, links: links.slice(-1) };
    }, [user]);

    return (
        <div className={styles.container}>
            <div className={styles["header-panel"]}>
                <Link to="/">
                    <img width={50} height={50} src={Logo} />
                </Link>

                <DropdownComponent items={config.links}>
                    <Flex gap={8} align="center">
                        <img src={NoAvatar} width={40} height={40} />

                        <strong>{config.login}</strong>
                    </Flex>
                </DropdownComponent>
            </div>
        </div>
    );
};

export default HeaderPanel;
