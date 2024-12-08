import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { authors } from "src/shared/constants";
import { Card, DescriptionText, ErrorTitle, Flex, Title2 } from "src/shared/UI";
import NoAvatar from "src/assets/no-avatar.jpg";
import { DocumentChip, Slider, TitleWithButton } from "src/shared/components";
import styles from "./styles.module.css";
import AddItemModal from "src/Widgets/AddItemModal";
import { authorFormFields } from "src/entities/authors/constants";
import { IDocument } from "src/shared/types";
import { documents as stubDocuments } from "src/shared/constants";

const AuthorProfile = () => {
    const { id } = useParams();

    const author = useMemo(() => {
        const current = authors.find((el) => !id || el.id === +id);
        if (!current) return undefined;
        return current;
    }, [authors]);

    const [isEditingMode, setIsEditingMode] = useState<boolean>(false);
    const closeShowed = useCallback(() => {
        setIsEditingMode(false);
    }, [setIsEditingMode]);

    const [documents, setDocuments] = useState<IDocument[]>(stubDocuments);

    if (!author) return <ErrorTitle>Автор не найден!</ErrorTitle>;
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
                        {author.fullName}
                    </TitleWithButton>
                </Flex>
                <Flex gap={40} align="center">
                    <img
                        width={250}
                        height={250}
                        className={styles.author__avatar}
                        src={author.avatarUrl ?? NoAvatar}
                    />
                    <Flex $isVertical gap={12}>
                        <Title2>{author.fullName}</Title2>
                        <DescriptionText fontSize={18}>
                            {author.biography}
                        </DescriptionText>
                    </Flex>
                </Flex>{" "}
            </Card>

            <Card>
                <Title2 $mb={15}>Работы автора</Title2>
                <Slider>
                    <Flex gap={20}>
                        {author.documents.map((el) => (
                            <DocumentChip
                                key={el.id}
                                document={el}
                                skipAuthor
                                extension="pdf"
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
                defaultValues={author}
                title={author.fullName}
                description="Введите данные для редактирования и сохраните изменения"
            />
        </Flex>
    );
};

export default AuthorProfile;
