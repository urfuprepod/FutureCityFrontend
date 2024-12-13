import {
    AuthorsDoughnut,
    AuthorsGraph,
    DocumentsTrandChart,
    LocationGraph,
    TagsGraph,
} from "src/entities/main";
import { Flex, MainContainer, Title1 } from "src/shared/UI";
import { useMemo, useState } from "react";
import { FilterFabric, IAuthor, IDocument } from "src/shared/types";
import { useGenerateDecade } from "src/shared/hooks";
import FiltersGrid from "src/Widgets/FiltersGrid";
import { useFilters } from "src/shared/hooks/useFilters";
import { rtkHooks } from "src/app/store";

const MainPage = () => {
    const { data: authors } = rtkHooks.useGetAuthorsQuery(undefined);
    const { data: documents } = rtkHooks.useGetDocumentsQuery(undefined);
    const { data: futureStatuses } =
        rtkHooks.useGetFutureStatusesQuery(undefined);
    const {data: tags} = rtkHooks.useGetTagsQuery(undefined);

    const decades = useGenerateDecade(documents);

    const filterConfig = useMemo<FilterFabric[]>(() => {
        return [
            {
                label: "Авторы",
                name: "authors",
                type: "select",
                placeholder: "Авторы",
                isMulti: true,
                options: authors ?? [],
                labelField: "fullName",
            },
            {
                label: "Статусы города",
                name: "status",
                type: "select",
                placeholder: "Статусы",
                isMulti: false,
                options: futureStatuses ?? [],
                labelField: "label",
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
        groupedByLocation: Record<string, Record<number, number>>;
    }>(() => {
        const filteredAuthors = (authors ?? [])
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

        const filteredDocuments = (documents ?? []).filter((el) => {
            const isStatusCorrect =
                !filter.status || String(el.futureStatusId) === filter.status;
            const isAuthorsCorrect =
                !filter.authors?.length ||
                el.authors.some((aut) =>
                    (filter.authors as string[]).includes(String(aut.id))
                );

            const isDecadeCorrect =
                !filter.decades?.length ||
                filter.decades.includes(String(Math.floor(el.year / 10) * 10));
            return isStatusCorrect && isAuthorsCorrect && isDecadeCorrect;
        });
        const groupedByLocation = filteredDocuments.reduce<
            Record<string, Record<string, number>>
        >((acc: Record<string, Record<number, number>>, cur: IDocument) => {
            if (!acc[cur.location]) {
                acc[cur.location] = { [cur.futureStatusId]: 1 };
            } else {
                acc[cur.location] = {
                    ...acc[cur.location],
                    [cur.futureStatusId]: acc[cur.location][cur.futureStatusId]
                        ? acc[cur.location][cur.futureStatusId] + 1
                        : 1,
                };
            }
            return acc;
        }, {});
        return {
            authors: filteredAuthors,
            documents: filteredDocuments,
            groupedByLocation,
        };
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
                <LocationGraph grouped={config.groupedByLocation} />
                <TagsGraph authors={config.documents} tags={tags ?? []} />
                <DocumentsTrandChart documents={config.documents} />
            </MainContainer>
        </Flex>
    );
};

export default MainPage;
