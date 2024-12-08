import { FC, forwardRef, useImperativeHandle } from "react";
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

    const onSubmitForm = async (data: any) => {
        onSubmit?.(data);
        console.log(data);
    };

    useImperativeHandle(
        ref,
        () => {
            return {
                formState,
                getValues,
                setValue,
                reset
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
                        field={field}
                        error={errors[field.name]}
                        register={register}
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
