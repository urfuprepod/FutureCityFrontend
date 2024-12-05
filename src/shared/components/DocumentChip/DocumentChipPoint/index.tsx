import { FC } from "react";
import { Flex } from "src/shared/UI";
import styles from "./styles.module.css";

type Props = {
    title: string;
    value: string;
};
const DocumentChipPoint: FC<Props> = (props) => {
    const { title, value } = props;

    return (
        <Flex align="center" gap={10}>
            <span className={styles.point__name}>{title}</span>{" "}
            <span className={styles.point__value}>{value}</span>
        </Flex>
    );
};

export default DocumentChipPoint;
