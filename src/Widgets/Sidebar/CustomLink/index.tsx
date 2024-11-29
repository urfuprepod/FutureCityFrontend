import classNames from "classnames";
import { FC, PropsWithChildren, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";

type Props = {
    url: string;
    className?: string;
};
const CustomLink: FC<PropsWithChildren<Props>> = (props) => {
    const { url, className, children } = props;

    const location = useLocation();

    const isActive = useMemo(() => {
        if (url === "/") return location.pathname === "/";
        return location.pathname.includes(url);
    }, [location.pathname, url]);

    return (
        <Link
            to={url}
            className={classNames(className, styles.link, {
                [styles.active]: isActive,
            })}
        >
            {children}
        </Link>
    );
};

export default CustomLink;
