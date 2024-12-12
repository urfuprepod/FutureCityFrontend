import { useMemo } from "react";
import { rtkHooks } from "src/app/store";
import { authorFormFields } from "../constants";


function generateAuthorFormData(data: any) {
    const formData: any = new FormData();
    formData.append("fullName", data.fullName);
    if (data.biography) {
        formData.append("biography", data.biography);
    }
    if (data.avatar) {
        formData.append("image", data.avatar);
    }
    if (data.documents)
        data.documents.forEach((el: any) => {
            formData.append("documents", el);
        });
    return formData;
}

type ReturnType = [IFormField[], (data: any) => FormData]

export const useAuthorsColumns = (): ReturnType => {

    const { data: documents } = rtkHooks.useGetDocumentsQuery(undefined);

    const columns = useMemo(() => {
        return authorFormFields.concat({
            type: "select",
            name: "documents",
            isMulti: true,
            label: "Документы",
            options: (documents ?? [])?.map((doc) => ({
                value: doc.id,
                label: doc.title,
            })),
        });
    }, [documents]);

    return [columns, generateAuthorFormData]
}