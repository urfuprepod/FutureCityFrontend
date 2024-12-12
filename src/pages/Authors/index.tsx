import { useMemo, useState } from "react";
import { rtkHooks } from "src/app/store";
import { AuthorCard } from "src/entities/authors";
import { useAuthorsColumns } from "src/entities/authors/hooks";
import { TitleWithButton } from "src/shared/components";
import { useFilters } from "src/shared/hooks/useFilters";
import { FilterFabric } from "src/shared/types";
import { Flex, GridLine } from "src/shared/UI";
import AddItemModal from "src/Widgets/AddItemModal";
import FiltersGrid from "src/Widgets/FiltersGrid";



const filtersBase: FilterFabric[] = [
    {
        type: "input",
        label: "Поиск",
        placeholder: "Умный поиск",
        name: "search",
    },
];
const AuthorsPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading } = rtkHooks.useGetAuthorsQuery(undefined);
    const [createAuthor] = rtkHooks.useAddAuthorMutation();
    const { filter, updateFilters } = useFilters(filtersBase);

    const authors = useMemo(() => {
        if (!data) return [];
        return data.filter(
            (author) =>
                !filter.search ||
                author.fullName
                    .toLowerCase()
                    .includes((filter.search as string).toLowerCase())
        );
    }, [data, filter]);

    const [columns, generateForm] = useAuthorsColumns();

    if (isLoading) return <p>Loading...</p>;
    return (
        <Flex $isVertical gap={20}>
            <TitleWithButton
                buttonTitle="Добавить"
                onClick={() => setIsOpen(true)}
            >
                Список авторов
            </TitleWithButton>

            <FiltersGrid
                filters={filtersBase}
                itemsInRow={1}
                value={filter}
                onChangeFilters={updateFilters}
            />

            <GridLine $minWidth={200}>
                {authors.map((author) => (
                    <AuthorCard key={author.id} author={author} />
                ))}
            </GridLine>

            <AddItemModal
                showed={isOpen}
                closeShowed={() => setIsOpen(false)}
                onAccept={async (data: any) => {
                    createAuthor(generateForm(data));
                }}
                title="Добавить автора"
                fields={columns}
                description="Введите данные для создания и сохраните изменения"
            />
        </Flex>
    );
};

export default AuthorsPage;
