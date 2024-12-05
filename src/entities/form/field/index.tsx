import classNames from "classnames";
import React, {
    DetailedHTMLProps,
    FC,
    InputHTMLAttributes,
    useState,
} from "react";
import {
    FieldError,
    FieldErrorsImpl,
    FieldValues,
    Merge,
    UseFormRegister,
} from "react-hook-form";
import { IFormField } from "src/shared/types";
import { Flex, Input, TextArea } from "src/shared/UI";
import styles from "./styles.module.css";

const dictionary: Record<string, string> = {
    required: "Это обязательное поле",
};

type Props = {
    field: IFormField;
    register: UseFormRegister<FieldValues>;
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};
const FormField: FC<
    Props
    // DetailedHTMLProps<
    //     InputHTMLAttributes<HTMLInputElement>,
    //     HTMLInputElement
    // >
> = (props) => {
    const {
        field: { name, label, type, isRequired },
        register,
        error,
        ...rest
    } = props;

    const [isTouched, setIsTouched] = useState<boolean>(false);

    return (
        <>
            <label
                className={classNames(styles.label, {
                    [styles.required]: isRequired,
                })}
                htmlFor={name}
            >
                {label}
            </label>
            <Flex $isVertical gap={5}>
                {type === "input" ? (
                    <Input
                        $error={!!error?.type}
                        {...rest}
                        id={name}
                        {...register(name, { required: isRequired })}
                    />
                ) : type === "textarea" ? (
                    <TextArea {...register(name, { required: isRequired })} id={name} $error={!!error?.type} />
                    
                ) : (
                    <Input type="number" id={name} />
                )}

                <span
                    className={classNames(styles["error-message"], {
                        none: !error?.type,
                    })}
                >
                    {dictionary[(error?.type as string) ?? ""]}
                </span>
            </Flex>
        </>
    );
};

export default FormField;
