import { IFormField } from "src/shared/types";

export const authorFormFields: IFormField[] = [
    { type: "input", name: "fullName", label: "Полное имя", isRequired: true },
    { type: "textarea", name: "biography", label: "Биография" },
    {
        type: "file",
        name: "avatar",
        label: "Изображение профиля",
    },
    {
        type: "file",
        name: "documents",
        label: "Документы",
    },
];
