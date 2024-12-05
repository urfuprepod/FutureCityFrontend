import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { authors } from "src/shared/constants";
import {
    Button,
    Card,
    ErrorTitle,
    Flex,
    TextArea,
    Title1,
    Title2,
} from "src/shared/UI";
import NoAvatar from "src/assets/no-avatar.jpg";
import { DocumentChip, FakeInput, Slider } from "src/shared/components";
import styles from "./styles.module.css";
import AddItemModal from "src/Widgets/AddItemModal";

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

    if (!author) return <ErrorTitle>Автор не найден!</ErrorTitle>;
    return (
        <Flex $isVertical gap={12}>
            <Card>
                <Flex>
                    <Title1 $mb={20}>{author.fullName}</Title1>{" "}
                    <Button
                        onClick={() => {
                            setIsEditingMode(true);
                        }}
                    >
                        Редактировать
                    </Button>
                </Flex>
                <Flex gap={40} align="center">
                    <img
                        width={250}
                        height={250}
                        className={styles.author__avatar}
                        src={author.avatarUrl ?? NoAvatar}
                    />

                    <Title2>{author.fullName}</Title2>
                </Flex>{" "}
                <FakeInput>{author.biography}</FakeInput>
            </Card>

            <Card>
                <Title2 $mb={15}>Работы автора</Title2>
                <Slider>
                    <Flex gap={20}>
                        {author.documents.map((el) => (
                            <DocumentChip
                                key={el.id}
                                document={el}
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
                title={author.fullName}
                description="Введите данные для редактирования и сохраните изменения"
            />
        </Flex>
    );
};

export default AuthorProfile;
