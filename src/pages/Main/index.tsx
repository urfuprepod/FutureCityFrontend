import {
    futureStatuses,
    authors as stubAuthors,
    documents as stubDocuments,
} from "src/shared/constants";
import {
    AuthorsDoughnut,
    AuthorsGraph,
    DocumentsTrandChart,
    TagsGraph,
} from "src/entities/main";
import { Flex, MainContainer, Title1 } from "src/shared/UI";
import { useMemo, useState } from "react";
import { FilterFabric, IAuthor, IDocument } from "src/shared/types";
import { useGenerateDecade, useQueryFilter } from "src/shared/hooks";
import FiltersGrid from "src/Widgets/FiltersGrid";
import { useFilters } from "src/shared/hooks/useFilters";

const MainPage = () => {
    const [authors, setAuthors] = useState<IAuthor[]>(stubAuthors);
    const [picked, setPicked] = useQueryFilter("picked", []);
    const [documents, setDocuments] = useState<IDocument[]>(stubDocuments);

    const decades = useGenerateDecade(documents);

    const filterConfig = useMemo<FilterFabric[]>(() => {
        return [
            {
                label: "Авторы",
                name: "authors",
                type: "select",
                placeholder: "Авторы",
                isMulti: true,
                options: authors,
                labelField: "fullName",
            },
            {
                label: "Статусы города",
                name: "status",
                type: "select",
                placeholder: "Статусы",
                isMulti: false,
                options: futureStatuses,
                labelField: "name",
            },
            {
                label: "Десятилетия",
                name: "decades",
                type: "select",
                labelField: "name",
                placeholder: "Десятилетия",
                isMulti: true,
                options: decades,
            },
        ];
    }, [authors, futureStatuses]);

    const { filter, updateFilters } = useFilters(filterConfig);

    const config = useMemo<{
        authors: IAuthor[];
        documents: IDocument[];
    }>(() => {
        const filteredAuthors = authors
            .filter(
                (author) =>
                    !filter.authors?.length ||
                    filter.authors.includes(String(author.id))
            )
            .map((el) => {
                const documents = el.documents.filter(
                    (doc) =>
                        (!filter.status ||
                            String(doc.futureStatusId) === filter.status) &&
                        (!filter.decades?.length ||
                            filter.decades.includes(
                                String(Math.floor(doc.year / 10) * 10)
                            ))
                );
                return { ...el, documents };
            });

        const filteredDocuments = documents.filter((el) => {
            const isStatusCorrect =
                !filter.status || String(el.futureStatusId) === filter.status;
            const isAuthorsCorrect =
                !filter.authors?.length ||
                filter.authors.includes(String(el.authorId));
            const isDecadeCorrect =
                !filter.decades?.length ||
                filter.decades.includes(String(Math.floor(el.year / 10) * 10));
            return isStatusCorrect && isAuthorsCorrect && isDecadeCorrect;
        });
        return { authors: filteredAuthors, documents: filteredDocuments };
    }, [authors, documents, filter]);

    return (
        <Flex $isVertical gap={16} align="center">
            <Title1>Статистика научных статей о городе будущего</Title1>
            <FiltersGrid
                filters={filterConfig}
                itemsInRow={3}
                value={filter}
                onChangeFilters={updateFilters}
            />
            <MainContainer>
                <AuthorsGraph authors={config.authors} />
                <AuthorsDoughnut documents={config.documents} />
                <TagsGraph authors={authors} />
                <DocumentsTrandChart documents={documents} />
            </MainContainer>
        </Flex>
    );
};

export default MainPage;
