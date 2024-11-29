import React, { FC } from "react";
import NoAvatar from "src/assets/no-avatar.jpg";
import styles from "./styles.module.css";

type Props = {
    url?: string;
    alt?: string;
};
const Avatar: FC<Props> = React.memo(({ url, alt }) => {
    return (
        <div className={styles["avatar-container"]}>
            <img alt={alt ?? "avatar"} src={url ?? NoAvatar} />
        </div>
    );
});

export default Avatar;
