import React, { FC, useId } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { Input } from "src/shared/UI";

const InputControl: FC<
    React.InputHTMLAttributes<HTMLInputElement> & { title: string }
> = (props) => {
    const { className, title, ...rest } = props;
    const id = useId();

    return (
        <div className={classNames(className, styles.control)}>
            <label htmlFor={id}>{title}</label>
            <Input {...rest} id={id} />
        </div>
    );
};

export default InputControl;
