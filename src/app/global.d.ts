type FormFileldType =
    | "input"
    | "textarea"
    | "select"
    | "file"
    | "image"
    | "number";

interface IFormField {
    name: string;
    type: FormFileldType;
    label: string;
    isRequired?: boolean;
    url?: string;
    options?: {
        value: number;
        label: string;
    }[];
    onChange?: (
        getValues: UseFormGetValues<Record<string, any>>,
        setValue: UseFormSetValue<Record<string, any>>
    ) => void;
}
