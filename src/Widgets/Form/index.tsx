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
};
const Form = forwardRef((props: Props, ref) => {
    const { fields, defaultValues, onSubmit } = props;

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
            {/* <FormField
                field={{
                    type: "input",
                    label: "голые тетки",
                    name: "girls",
                    isRequired: true,
                }}
                error={errors.girls}
                register={register}
            /> */}

            {/* <label htmlFor="name">Name</label>

                <input
                    id="name"
                    {...register("name", { required: true, maxLength: 30 })}
                />
                {errors.name && errors.name.type === "required" && (
                    <span>This is required</span>
                )}
                {errors.name && errors.name.type === "maxLength" && (
                    <span>Max length exceeded</span>
                )} */}
            <Button className={styles["submit-button"]} type="submit">
                Сохранить
            </Button>
            {/* <input type="submit" /> */}
        </form>
    );
});

export default Form;
