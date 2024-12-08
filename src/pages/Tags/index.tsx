import React, { useMemo, useState } from "react";
import { rtkHooks } from "src/app/store";
import { tagsColumns } from "src/entities/tags/constants";
import { TitleWithButton, DocumentChip } from "src/shared/components";
import { Flex, GridLine } from "src/shared/UI";
import AddItemModal from "src/Widgets/AddItemModal";

const TagsPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { data } = rtkHooks.useGetTagsQuery(undefined);
    const { data: futureStatuses } =
        rtkHooks.useGetFutureStatusesQuery(undefined);
    const [createTag] = rtkHooks.useSetTagMutation();

    const columns = useMemo<IFormField[]>(() => {
        return tagsColumns.concat({
            name: "futureStatusId",
            label: "Статус города",
            type: "select",
            isRequired: true,
            options: futureStatuses?.map((el) => ({
                value: el.id,
                label: el.name,
            })),
        });
    }, [futureStatuses]);

    if (!data) return null;
    return (
        <Flex $isVertical gap={20}>
            <TitleWithButton
                buttonTitle="Создать тэг"
                onClick={() => setIsOpen(true)}
            >
                Теги
            </TitleWithButton>

            <GridLine $minWidth={300}>
                {data.map((tag) => (
                    <p>{tag.name}</p>
                ))}
            </GridLine>

            <AddItemModal
                showed={isOpen}
                closeShowed={() => setIsOpen(false)}
                onAccept={async (data: any) => {
                    createTag(data);
                }}
                title="Добавить тэг"
                fields={columns}
                description="Введите данные для создания и сохраните изменения"
            />
        </Flex>
    );
};

export default TagsPage;
