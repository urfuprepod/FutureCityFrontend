import React, { useMemo, useState } from "react";
import { rtkHooks } from "src/app/store";
import { tagsColumns } from "src/entities/tags/constants";
import { TitleWithButton } from "src/shared/components";
import { useFilters } from "src/shared/hooks/useFilters";
import { FilterFabric } from "src/shared/types";
import { Flex, GridLine, Title1 } from "src/shared/UI";
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
const TagsPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { data } = rtkHooks.useGetTagsQuery(undefined);
    const { data: futureStatuses } =
        rtkHooks.useGetFutureStatusesQuery(undefined);
    const [createTag] = rtkHooks.useSetTagMutation();

    const config = useMemo(() => {
        return {
            columns: tagsColumns.concat({
                name: "futureStatusId",
                label: "Статус города",
                type: "select",
                isRequired: true,
                options: futureStatuses ?? [],
            }),
            filters: filtersBase.concat({
                name: "status",
                isMulti: false,
                labelField: "label",
                placeholder: "Статусы",
                label: "Статус города",
                type: "select",
                options: futureStatuses ?? [],
            }),
        };
    }, [futureStatuses]);

    const { filter, updateFilters } = useFilters(filtersBase);

    const filteredTags = useMemo(() => {
        if (!data) return [];
        console.log(filter.status);
        return data
            .filter(
                (tag) =>
                    !filter.search ||
                    tag.name
                        .toLowerCase()
                        .includes((filter.search as string).toLowerCase())
            )
            .filter(
                (tag) =>
                    !filter.status ||
                    filter.status == String(tag.futureStatusId)
            );
    }, [filter, data]);

    if (!data) return null;
    return (
        <Flex $isVertical gap={20}>
            <TitleWithButton
                buttonTitle="Создать тэг"
                onClick={() => setIsOpen(true)}
            >
                Тэги
            </TitleWithButton>

            <FiltersGrid
                filters={config.filters}
                itemsInRow={2}
                value={filter}
                onChangeFilters={updateFilters}
            />

            <GridLine $minWidth={200} $isFill>
                {filteredTags.length ? (
                    filteredTags.map((tag) => <p key={tag.id}>{tag.name}</p>)
                ) : (
                    <Title1>Не найдено</Title1>
                )}
            </GridLine>

            <AddItemModal
                showed={isOpen}
                closeShowed={() => setIsOpen(false)}
                onAccept={async (data: any) => {
                    createTag(data);
                }}
                title="Добавить тэг"
                fields={config.columns}
                description="Введите данные для создания и сохраните изменения"
            />
        </Flex>
    );
};

export default TagsPage;
