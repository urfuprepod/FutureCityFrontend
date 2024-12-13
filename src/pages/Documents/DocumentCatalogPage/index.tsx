import { useMemo, useRef, useState } from "react";
import { DocumentChip, TitleWithButton } from "src/shared/components";
import { Flex, GridLine } from "src/shared/UI";
import { FilterFabric, IDocumentBody } from "src/shared/types";
import { documentsColumns } from "src/entities/documents/constants";
import AddItemModal from "src/Widgets/AddItemModal";
import { FormState } from "react-hook-form";
import { rtkHooks } from "src/app/store";
import FiltersGrid from "src/Widgets/FiltersGrid";
import { useFilters } from "src/shared/hooks/useFilters";

function setDocumentToFormData(doc: IDocumentBody) {
    const formData: any = new FormData();
    formData.append("title", doc.title);
    formData.append("year", String(doc.year));
    formData.append("file", doc.file);
    formData.append("location", doc.location);
    formData.append("tagIds", doc.tagIds);
    formData.append("futureStatusId", String(doc.status));
    if (doc.authors) {
        doc.authors.forEach(el => {
            formData.append("authorIds", el);
        })
    }
    return formData;
}

const filtersBase: FilterFabric[] = [
    {
        type: "input",
        label: "Поиск",
        placeholder: "Умный поиск",
        name: "search",
    },
];

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

    const filtersConfig = useMemo(() => {
        return filtersBase.concat({
            name: "status",
            isMulti: false,
            labelField: "label",
            placeholder: "Статусы",
            label: "Статус города",
            type: "select",
            options: futureStatuses ?? [],
        });
    }, [futureStatuses]);

    const columns = useMemo<IFormField[]>(() => {
        console.log(currentFutureStatusId);
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
                    setCurrentFutureStatusId(getValues("status") ?? null);
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
    }, [futureStatuses, tags, authors, currentFutureStatusId]);

    const { filter, updateFilters } = useFilters(filtersBase);

    const filteredItems = useMemo(() => {
        if (!data) return [];
        return data.filter(
            (doc) =>
                (!filter.search ||
                    doc.title
                        .toLowerCase()
                        .includes((filter.search as string).toLowerCase())) &&
                (!filter.status ||
                    String(doc.futureStatusId) === String(filter.status))
        );
    }, [filter, data]);

    if (!data) return null;

    return (
        <Flex $isVertical gap={20}>
            <TitleWithButton
                buttonTitle="Создать документ"
                onClick={() => setIsDocumentOpen(true)}
            >
                Документы
            </TitleWithButton>

            <FiltersGrid
                filters={filtersConfig}
                itemsInRow={2}
                value={filter}
                onChangeFilters={updateFilters}
            />

            <GridLine $minWidth={300}>
                {filteredItems.map((doc) => (
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
