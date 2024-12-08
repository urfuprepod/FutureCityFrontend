import { useMemo, useState } from "react";
import { rtkHooks } from "src/app/store";
import { AuthorCard } from "src/entities/authors";
import { authorFormFields } from "src/entities/authors/constants";
import { TitleWithButton } from "src/shared/components";
import { Flex, GridLine } from "src/shared/UI";
import AddItemModal from "src/Widgets/AddItemModal";

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
const AuthorsPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading } = rtkHooks.useGetAuthorsQuery(undefined);
    const { data: documents } = rtkHooks.useGetDocumentsQuery(undefined);
    const [createAuthor] = rtkHooks.useAddAuthorMutation();

    const columns = useMemo(() => {
        console.log(documents)
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

    if (isLoading) return <p>Loading...</p>;
    return (
        <Flex $isVertical gap={20}>
            <TitleWithButton
                buttonTitle="Добавить"
                onClick={() => setIsOpen(true)}
            >
                Список авторов
            </TitleWithButton>

            <GridLine $minWidth={200}>
                {(data ?? []).map((author) => (
                    <AuthorCard key={author.id} author={author} />
                ))}
            </GridLine>

            <AddItemModal
                showed={isOpen}
                closeShowed={() => setIsOpen(false)}
                onAccept={async (data: any) => {
                    createAuthor(generateAuthorFormData(data));
                }}
                title="Добавить автора"
                fields={columns}
                description="Введите данные для создания и сохраните изменения"
            />
        </Flex>
    );
};

export default AuthorsPage;
