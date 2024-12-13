import classNames from "classnames";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import {
    Control,
    Controller,
    FieldError,
    FieldErrorsImpl,
    FieldValues,
    Merge,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";
import { Flex, Input, TextArea } from "src/shared/UI";
import styles from "./styles.module.css";
import ReactSelect, { SelectInstance, SingleValue } from "react-select";
import { useEffectSkipFirstRender } from "src/shared/hooks";

const dictionary: Record<string, string> = {
    required: "Это обязательное поле",
};

type Props = {
    field: IFormField;
    register: UseFormRegister<FieldValues>;
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    control: Control<Record<string, any>, any>;
    setValue: UseFormSetValue<Record<string, any>>;
    getValues: UseFormGetValues<Record<string, any>>;
    defaultVal?: number[] | number;
    trigger: boolean;
};
const FormField: FC<Props> = (props) => {
    const {
        field: { name, label, type, isRequired, options, isMulti, onChange },
        register,
        error,
        control,
        defaultVal,
        getValues,
        trigger,
        setValue,
        ...rest
    } = props;

    const defaultSelectValues = useMemo(() => {
        if (!defaultVal || type !== "select" || !options) return null;
        if (Array.isArray(defaultVal))
            return options.filter((el) => defaultVal.includes(el.value));
        return options.find((el) => el.value === defaultVal);
    }, [options, defaultVal, type]);

    const ref = useRef<SelectInstance<any>>(null);

    useEffectSkipFirstRender(() => {
        if (ref.current) {
            ref.current.clearValue();
        }
    }, trigger);
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
                {type === "input" || type === "password" ? (
                    <Input
                        $error={!!error?.type}
                        autoComplete="new-password"
                        placeholder="Введите"
                        {...rest}
                        type={type === "password" ? "password" : "text"}
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
                            ref={ref}
                            className="select"
                            placeholder={"Выберите..."}
                            isClearable
                            isSearchable={true}
                            isMulti={isMulti}
                            defaultValue={
                                defaultVal ? defaultSelectValues : null
                            }
                            noOptionsMessage={() => <span>Не найдено</span>}
                            options={options ?? []}
                            onChange={(selectedOption) => {
                                setValue(
                                    name,
                                    Array.isArray(selectedOption)
                                        ? selectedOption.map((el) => el.value)
                                        : (
                                              selectedOption as SingleValue<{
                                                  value: number;
                                                  label: string;
                                              }>
                                          )?.value
                                );
                                onChange?.(getValues, setValue);
                            }}
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
