import React, { FC } from "react";
import { IAuthor } from "src/shared/types";
import NoAvatar from "src/assets/no-avatar.jpg";
import { Button, Title6 } from "src/shared/UI";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

type Props = {
    author: IAuthor;
};

const classPrefix = "profile-card";

const AuthorCard: FC<Props> = React.memo(({ author }) => {
    const { avatarUrl, fullName, biography, id } = author;
    const navigate = useNavigate();

    return (
        <div
            className={styles[classPrefix]}
            onClick={() => {
                navigate(`${id}`);
            }}
        >
            <img
                className={styles[classPrefix + "__avatar"]}
                width={80}
                height={80}
                src={avatarUrl ?? NoAvatar}
            />
            <Title6>{fullName}</Title6>
            <p className={styles[classPrefix + "__biography"]}>{biography}</p>
            <Button className="">Подробнее</Button>
        </div>
    );
});

export default AuthorCard;
