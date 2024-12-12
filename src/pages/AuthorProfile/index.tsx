import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    DescriptionText,
    DocumentList,
    ErrorTitle,
    Flex,
    Title2,
    Title3,
} from "src/shared/UI";
import NoAvatar from "src/assets/no-avatar.jpg";
import { DocumentChip, TitleWithButton } from "src/shared/components";
import styles from "./styles.module.css";
import AddItemModal from "src/Widgets/AddItemModal";
import { rtkHooks } from "src/app/store";
import { useAuthorsColumns } from "src/entities/authors/hooks";

const AuthorProfile = () => {
    const { id } = useParams();

    const { data, isLoading } = rtkHooks.useGetSingleAuthorQuery(id ? +id : -1);
    const [editAuthor] = rtkHooks.useEditAuthorMutation();
    const [columns, generateForm] = useAuthorsColumns();

    const [isEditingMode, setIsEditingMode] = useState<boolean>(false);
    const closeShowed = useCallback(() => {
        setIsEditingMode(false);
    }, [setIsEditingMode]);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <ErrorTitle>Автор не найден!</ErrorTitle>;
    return (
        <Flex $isVertical gap={12}>
            <Card>
                <Flex>
                    <TitleWithButton
                        marginBottom={20}
                        buttonTitle="Редактировать"
                        onClick={() => {
                            setIsEditingMode(true);
                        }}
                    >
                        {data.fullName}
                    </TitleWithButton>
                </Flex>
                <Flex gap={40} align="center">
                    <img
                        width={250}
                        height={250}
                        className={styles.author__avatar}
                        src={
                            data.avatarUrl
                                ? `http://localhost:3000/` + data.avatarUrl
                                : NoAvatar
                        }
                    />
                    <Flex $isVertical gap={12}>
                        <Title2>{data.fullName}</Title2>
                        <DescriptionText fontSize={18}>
                            {data.biography}
                        </DescriptionText>
                    </Flex>
                </Flex>{" "}
            </Card>

            <Card>
                <Title2 $mb={15}>Работы автора</Title2>

                {data.documents.length ? (
                    <DocumentList $gap={20}>
                        {data.documents.map((el) => (
                            <DocumentChip
                                key={el.id}
                                document={el}
                                skipAuthor
                            />
                        ))}
                    </DocumentList>
                ) : (
                    <Title3>Работ пока нет!</Title3>
                )}
            </Card>
            <AddItemModal
                showed={isEditingMode}
                closeShowed={closeShowed}
                onAccept={async (val: any) => {
                    editAuthor({ body: generateForm(val), id: data.id ?? -1 });
                }}
                fields={columns}
                defaultValues={{
                    ...data,
                    documents: data.documents.map(el => el.id),
                }}
                title={data.fullName}
                description="Введите данные для редактирования и сохраните изменения"
            />
        </Flex>
    );
};

export default AuthorProfile;
