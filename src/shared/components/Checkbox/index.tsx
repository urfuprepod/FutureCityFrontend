import React, { FC, PropsWithChildren, useId } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import styles from "./styles.module.css";

type Props = {
    register: UseFormRegister<FieldValues>;
};

const Checkbox: FC<
    PropsWithChildren<
        Props &
            React.DetailedHTMLProps<
                React.InputHTMLAttributes<HTMLInputElement>,
                HTMLInputElement
            >
    >
> = (props) => {
    const { children, className, name, ...rest } = props;
    const id = useId();

    return (
        <>
            <input  id={name || id} type="checkbox" {...rest} />
            <label htmlFor={name || id} className={styles.checkbox}>
                {" "}
                <span className={styles.checkbox__inner}></span> {children}
            </label>
        </>
    );
};

export default Checkbox;
