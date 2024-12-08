import { FC, PropsWithChildren } from "react";
import { Button, Flex, Title1 } from "src/shared/UI";

type Props = {
    buttonTitle: string;
    onClick?: () => void;
    marginBottom?: number;
};
const TitleWithHeader: FC<PropsWithChildren<Props>> = (props) => {
    const { onClick, buttonTitle, children, marginBottom } = props;

    return (
        <Flex
            style={{ marginBottom: marginBottom ?? 0 }}
            gap={12}
            align="center"
        >
            <Title1>{children}</Title1>
            <Button onClick={onClick}>{buttonTitle}</Button>
        </Flex>
    );
};

export default TitleWithHeader;
