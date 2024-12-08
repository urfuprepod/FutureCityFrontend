import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { authors } from "src/shared/constants";
import { Card, DescriptionText, ErrorTitle, Flex, Title2 } from "src/shared/UI";
import NoAvatar from "src/assets/no-avatar.jpg";
import { DocumentChip, Slider, TitleWithButton } from "src/shared/components";
import styles from "./styles.module.css";
import AddItemModal from "src/Widgets/AddItemModal";
import { authorFormFields } from "src/entities/authors/constants";
import { rtkHooks } from "src/app/store";

const AuthorProfile = () => {
    const { id } = useParams();

    const { data, isLoading } = rtkHooks.useGetSingleAuthorQuery(id ? +id : -1);

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
                        src={data.avatarUrl ? `http://localhost:3000/`+data.avatarUrl : NoAvatar}
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
                <Slider>
                    <Flex gap={20}>
                        {data.documents.map((el) => (
                            <DocumentChip
                                key={el.id}
                                document={el}
                                skipAuthor
                            />
                        ))}
                    </Flex>
                </Slider>
            </Card>
            <AddItemModal
                showed={isEditingMode}
                closeShowed={closeShowed}
                onAccept={() =>
                    new Promise((resolve) => {
                        resolve();
                    })
                }
                fields={authorFormFields}
                defaultValues={data}
                title={data.fullName}
                description="Введите данные для редактирования и сохраните изменения"
            />
        </Flex>
    );
};

export default AuthorProfile;
