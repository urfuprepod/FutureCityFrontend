import { AuthorCard } from "src/entities/authors";
import { authors } from "src/shared/constants";
import { Flex, GridLine, Title1 } from "src/shared/UI";

const AuthorsPage = () => {
    return (
        <Flex $isVertical gap={20}>
            <Title1>Список авторов</Title1>
            <GridLine $minWidth={200}>
                {authors.map((author) => (
                    <AuthorCard author={author} />
                ))}
            </GridLine>
        </Flex>
    );
};

export default AuthorsPage;
