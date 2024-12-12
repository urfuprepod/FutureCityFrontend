export const documentsColumns: IFormField[] = [
    { type: "input", name: "title", label: "Название", isRequired: true },
    { type: "number", name: "year", label: "Год выпуска", isRequired: true },
    {type: 'file', name: 'file', label: 'Файл документа', isRequired: true},
    {type: 'input', name: 'location', label: 'Место написания', isRequired: true}
];
