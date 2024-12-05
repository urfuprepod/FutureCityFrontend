import React, { FC } from "react";
import { Flex, GridLayout } from "src/shared/UI";
import { useForm } from "react-hook-form";
import { FormField } from "src/entities/form";
import { IFormField } from "src/shared/types";

type Props = {
    gap?: number;
    inRow?: number;
    fields: IFormField[];
};
const Form: FC<Props> = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { fields } = props;

    const onSubmit = (data: any) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex $isVertical gap={10}>
                {fields.map((field) => (
                    <FormField
                        key={field.name}
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
            <input type="submit" />
        </form>
    );
};

export default Form;
