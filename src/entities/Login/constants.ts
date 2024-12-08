export const loginColumns: IFormField[] = [
    {
        type: "input",
        name: "login",
        label: "Логин",
        isRequired: true,
    },
    { type: "input", name: "password", label: "Пароль", isRequired: true },
];

export const registrationColumns: IFormField[] = [
    {
        type: "input",
        name: "firstName",
        label: "Имя пользователя",
        isRequired: true,
    },
    {
        type: "input",
        name: "lastName",
        label: "Фамилия пользователя",
        isRequired: true,
    },
    ...loginColumns
]