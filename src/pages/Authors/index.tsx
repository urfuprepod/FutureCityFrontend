import { useState } from "react";
import { AuthorCard } from "src/entities/authors";
import { authorFormFields } from "src/entities/authors/constants";
import { TitleWithButton } from "src/shared/components";
import { authors } from "src/shared/constants";
import { Flex, GridLine, Title1 } from "src/shared/UI";
import AddItemModal from "src/Widgets/AddItemModal";

const AuthorsPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Flex $isVertical gap={20}>
            <Title1>Список авторов</Title1>
            <TitleWithButton
                buttonTitle="Добавить"
                onClick={() => setIsOpen(true)}
            >
                Список авторов
            </TitleWithButton>

            <GridLine $minWidth={200}>
                {authors.map((author) => (
                    <AuthorCard key={author.id} author={author} />
                ))}
            </GridLine>

            <AddItemModal
                showed={isOpen}
                closeShowed={() => setIsOpen(false)}
                onAccept={() =>
                    new Promise((resolve) => {
                        resolve();
                    })
                }
                title="Добавить автора"
                fields={authorFormFields}
                description="Введите данные для создания и сохраните изменения"
            />
        </Flex>
    );
};

export default AuthorsPage;
