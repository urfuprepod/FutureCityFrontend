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
    const formData: any = new FormData();
    formData.append("title", doc.title);
    formData.append("year", String(doc.year));
    formData.append("file", doc.file);
    formData.append("tagIds", doc.tagIds);
    formData.append("status", String(doc.status));
    console.log('аоаоа')
    return formData;
}
const DocumentCatalogPage = () => {
    const [isDocumentOpen, setIsDocumentOpen] = useState(false);

    const [authors, setAuthors] = useState<IAuthor[]>(stubAuthors);
    const { data: tags } = rtkHooks.useGetTagsQuery(undefined);
    const [createDocument] = rtkHooks.useAddDocumentMutation();
    const ref = useRef(null);

    const { data } = rtkHooks.useGetDocumentsQuery(undefined);


    const {pageCounts, currentPage, updatePage, itemsPerPage} = usePagination(data?.rows, 15);


    const { data: futureStatuses } =
        rtkHooks.useGetFutureStatusesQuery(undefined);

    const columns = useMemo<IFormField[]>(() => {
        const parsedStatuses = (futureStatuses ?? []).map((el) => ({
            value: el.id,
            label: el.name,
        }));
        const parsedTags = (tags ?? []).map((el) => ({
            value: el.id,
            label: el.name,
        }));
        const parsedAuthors = authors.map((el) => ({
            value: el.id,
            label: el.fullName,
        }));
        return [
            ...documentsColumns,
            {
                type: "select",
                name: "status",
                label: "Статус города",
                options: parsedStatuses,
                onChange: (form: FormState<Record<string, any>>) => {
                    console.log(form);
                },
            },
            {
                type: "select",
                name: "tagIds",
                label: "Теги",
                options: parsedTags,
            },
            {
                type: "select",
                name: "authors",
                label: "Авторы",
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
    const { rows: documents, count } = data;
    return (
        <Flex $isVertical gap={20}>
            <TitleWithButton
                buttonTitle="Создать документ"
                onClick={() => setIsDocumentOpen(true)}
            >
                Документы
            </TitleWithButton>

            <GridLine $minWidth={300}>
                {documents.map((doc) => (
                    <DocumentChip key={doc.id} document={doc} extension="pdf" />
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
