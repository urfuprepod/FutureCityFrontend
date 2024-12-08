import classNames from "classnames";
import { FC, useState } from "react";
import {
    Control,
    Controller,
    FieldError,
    FieldErrorsImpl,
    FieldValues,
    Merge,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";
import { Flex, Input, TextArea } from "src/shared/UI";
import styles from "./styles.module.css";
import ReactSelect from "react-select";

const dictionary: Record<string, string> = {
    required: "Это обязательное поле",
};

type Props = {
    field: IFormField;
    register: UseFormRegister<FieldValues>;
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    control: Control<Record<string, any>, any>;
    setValue: UseFormSetValue<Record<string, any>>;
};
const FormField: FC<
    Props
    // DetailedHTMLProps<
    //     InputHTMLAttributes<HTMLInputElement>,
    //     HTMLInputElement
    // >
> = (props) => {
    const {
        field: { name, label, type, isRequired, options },
        register,
        error,
        control,
        setValue,
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
                        placeholder="Введите"
                        {...rest}
                        id={name}
                        {...register(name, { required: isRequired })}
                    />
                ) : type === "textarea" ? (
                    <TextArea
                        rows={33}
                        {...register(name, { required: isRequired })}
                        id={name}
                        $error={!!error?.type}
                    />
                ) : type === "file" ? (
                    <Controller
                        control={control}
                        name={name}
                        rules={
                            isRequired
                                ? { required: "Это обязательное поле" }
                                : {}
                        }
                        render={({ field: { value, onChange, ...field } }) => {
                            return (
                                <Input
                                    {...field}
                                    value={value?.fileName}
                                    onChange={(event) => {
                                        if (event.target.files) {
                                            console.log(
                                                event.target.files,
                                                "доклады папич"
                                            );
                                            const a = event.target.files[0];
                                            onChange(event.target.files[0]);
                                        }
                                    }}
                                    type="file"
                                    id={name}
                                />
                            );
                        }}
                    />
                ) : // <Input
                //     type="file"
                //     id={name}
                //     {...register(name, { required: isRequired })}
                // />
                type === "select" ? (
                    <>
                        <ReactSelect
                            className="select"
                            placeholder={"Выберите..."}
                            isClearable
                            options={options ?? []}
                            onChange={(selectedOption) =>
                                setValue(name, selectedOption?.value)
                            }
                            // {...register(name, { required: isRequired })}
                            classNamePrefix={"select"}
                        />
                        <input
                            type="hidden"
                            id={name}
                            {...register(name, { required: isRequired })}
                        />
                    </>
                ) : (
                    // <Controller
                    //     name={name}

                    //     control={control}
                    //     render={({ field }) => (
                    //         <ReactSelect
                    //             {...field}
                    //             className="select"
                    //             placeholder={"Выберите..."}
                    //             isClearable
                    //             options={options ?? []}
                    //             // {...register(name, { required: isRequired })}
                    //             classNamePrefix={"select"}
                    //         />
                    //     )}
                    // />
                    <Input
                        type="number"
                        id={name}
                        {...register(name, { required: isRequired })}
                    />
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
