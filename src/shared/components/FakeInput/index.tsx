import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.css";

const FakeInput: FC<PropsWithChildren<{}>> = (props) => {
    const { children } = props;

    return <div className={styles["fake-input"]}>{children}</div>;
};

export default FakeInput;
