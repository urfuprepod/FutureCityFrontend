import React, { useEffect, useMemo, useRef, useState } from "react";
import { DocumentChip, TitleWithButton } from "src/shared/components";
import { Flex, GridLine } from "src/shared/UI";
import {
    documents as stubDocuments,
    authors as stubAuthors,
} from "src/shared/constants";
import {
    IAuthor,
    ICityFuture,
    IDocument,
    IDocumentBody,
    ITag,
} from "src/shared/types";
import { documentsColumns } from "src/entities/documents/constants";
import AddItemModal from "src/Widgets/AddItemModal";
import { FormState } from "react-hook-form";
import { rtkHooks } from "src/app/store";
import { usePagination } from "src/shared/hooks";

function setDocumentToFormData(doc: IDocumentBody) {
    console.log(doc.tagIds, "доклады папича");
    const formData: any = new FormData();
    formData.append("title", doc.title);
    formData.append("year", String(doc.year));
    formData.append("file", doc.file);
    formData.append('location', doc.location);
    formData.append("tagIds", doc.tagIds);
    formData.append("status", String(doc.status));
    console.log("аоаоа");
    return formData;
}
const DocumentCatalogPage = () => {
    const [isDocumentOpen, setIsDocumentOpen] = useState(false);

    const { data: authors } = rtkHooks.useGetAuthorsQuery(undefined);
    const { data: tags } = rtkHooks.useGetTagsQuery(undefined);
    const [createDocument] = rtkHooks.useAddDocumentMutation();
    const [currentFutureStatusId, setCurrentFutureStatusId] = useState<
        number | null
    >(null);
    const ref = useRef(null);

    const { data } = rtkHooks.useGetDocumentsQuery(undefined);

    const { data: futureStatuses } =
        rtkHooks.useGetFutureStatusesQuery(undefined);

    const columns = useMemo<IFormField[]>(() => {
        const parsedTags = (tags ?? [])
            .filter(
                (tag) =>
                    tag.futureStatusId === currentFutureStatusId ||
                    !currentFutureStatusId
            )
            .map((el) => ({
                value: el.id,
                label: el.name,
            }));
        const parsedAuthors = (authors ?? []).map((el) => ({
            value: el.id,
            label: el.fullName,
        }));
        return [
            ...documentsColumns,
            {
                type: "select",
                name: "status",
                label: "Статус города",
                isRequired: true,
                options: futureStatuses ?? [],
                onChange(getValues, setValue) {
                    console.log(getValues());
                },
            },
            {
                type: "select",
                name: "tagIds",
                label: "Теги",
                isRequired: true,
                isMulti: true,
                options: parsedTags,
            },
            {
                type: "select",
                name: "authors",
                label: "Авторы",
                isMulti: true,
                options: parsedAuthors,
            },
        ];
    }, [futureStatuses, tags, authors]);

    useEffect(() => {
        setTimeout(() => {
            // @ts-ignore
            console.log(ref.current);
        }, 5000);
    }, []);

    if (!data) return null;

    return (
        <Flex $isVertical gap={20}>
            <TitleWithButton
                buttonTitle="Создать документ"
                onClick={() => setIsDocumentOpen(true)}
            >
                Документы
            </TitleWithButton>

            <GridLine $minWidth={300}>
                {data.map((doc) => (
                    <DocumentChip key={doc.id} document={doc} />
                ))}
            </GridLine>

            <AddItemModal
                showed={isDocumentOpen}
                closeShowed={() => setIsDocumentOpen(false)}
                ref={ref}
                onAccept={async (data) => {
                    createDocument(setDocumentToFormData(data));
                }}
                title="Добавить документ"
                fields={columns}
                description="Введите данные для создания и сохраните изменения"
            />
        </Flex>
    );
};

export default DocumentCatalogPage;
