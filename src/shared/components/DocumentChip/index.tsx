import React, { FC } from "react";
import { IDocument } from "src/shared/types";
import { Card, DocumentHeader, Flex } from "src/shared/UI";
import DocumentIcon from "../DocumentIcon";
import DocumentChipPoint from "./DocumentChipPoint";
import styles from "./styles.module.css";

type Props = {
    className?: string;
    document: IDocument;
    skipAuthor?: boolean;
};
const DocumentChip: FC<Props> = React.memo((props) => {
    const { document, className, skipAuthor } = props;

    const points = [
        { title: "Год", value: String(document.year) },
        { title: "Место", value: document.location },
        { title: "Тип города", value: document.status.name },
    ];
    if (!skipAuthor) {
        points.push({
            title: "Авторы",
            value: document.authors.map((el) => el.fullName).join(", "),
        });
    }

    return (
        <Card>
            <Flex className={className} gap={15} align="center">
                <a
                    href={`http://localhost:3000/` + "static/" + document.file}
                    download="myimage"
                >
                    <DocumentIcon
                        fileExtension={document.file.split(".").at(-1) ?? "pdf"}
                    />
                </a>
                <Flex
                    style={{ overflow: "hidden" }}
                    $isVertical
                    gap={10}
                    justify="space-between"
                    align="flex-start"
                >
                    <DocumentHeader>{document.title}</DocumentHeader>
                    <Flex $isVertical gap={5}>
                        {points.map(({ title, value }, index) => (
                            <DocumentChipPoint
                                key={index}
                                title={title}
                                value={value}
                            />
                        ))}
                    </Flex>
                </Flex>
            </Flex>
            {!!document.tags.length && (
                <Flex gap={5} style={{marginTop: 8}} $wrap>
                    {document.tags.map((tag) => (
                        <span key={tag.id} className={styles.tag}>{tag.name}</span>
                    ))}
                </Flex>
            )}
        </Card>
    );
});

export default DocumentChip;
