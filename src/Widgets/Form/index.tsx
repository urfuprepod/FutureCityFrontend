import { FC, forwardRef, useImperativeHandle, useState } from "react";
import { Button, Flex } from "src/shared/UI";
import { useForm } from "react-hook-form";
import { FormField } from "src/entities/form";
import styles from "./styles.module.css";

type Props = {
    gap?: number;
    inRow?: number;
    fields: IFormField[];
    defaultValues?: Record<string, any>;
    onSubmit?: (data: any) => Promise<void>;
    buttonTitle?: string;
};
const Form = forwardRef((props: Props, ref) => {
    const { fields, defaultValues, onSubmit, buttonTitle } = props;

    const {
        register,
        handleSubmit,
        reset,
        formState,
        control,
        getValues,
        setValue,
    } = useForm({
        defaultValues: defaultValues ?? {},
    });

    const { errors } = formState;
    const [trigger, setTrigger] = useState(false);

    const onSubmitForm = async (data: any) => {
        onSubmit?.(data);
    };

    useImperativeHandle(
        ref,
        () => {
            return {
                formState,
                getValues,
                setValue,
                reset: () => {
                    reset();
                    setTrigger(prev => !prev)
                }, 
            };
        },
        []
    );

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <Flex $isVertical gap={10}>
                {fields.map((field) => (
                    <FormField
                        key={field.name}
                        control={control}
                        setValue={setValue}
                        getValues={getValues}
                        defaultVal={defaultValues?.[field.name] ?? []}
                        field={field}
                        error={errors[field.name]}
                        register={register}
                        trigger={trigger}
                    />
                ))}
            </Flex>

            <Button className={styles["submit-button"]} type="submit">
                {buttonTitle ?? "Сохранить"}
            </Button>
        </form>
    );
});

export default Form;
