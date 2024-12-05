import React, { FC } from "react";
import { IDocument } from "src/shared/types";
import { DocumentHeader, Flex } from "src/shared/UI";
import DocumentIcon from "../DocumentIcon";
import DocumentChipPoint from "./DocumentChipPoint";

type Props = {
    extension: string;
    className?: string;
    document: IDocument;
    skipAuthor?: boolean;
};
const DocumentChip: FC<Props> = React.memo((props) => {
    const { extension, document, className, skipAuthor } = props;

    const points = [{ title: "Год", value: String(document.year) }];
    if (!skipAuthor) {
        points.push({ title: "Автор", value: document.title });
    }

    return (
        <a href={document.file} download>
            <Flex className={className} gap={15} align="center">
                <DocumentIcon fileExtension={extension} />
                <Flex $isVertical gap={10} justify="space-between" align="flex-start">
                    <DocumentHeader>{document.title}</DocumentHeader>
                    <Flex $isVertical gap={5}>
                        {points.map(({ title, value }) => (
                            <DocumentChipPoint title={title} value={value} />
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </a>
    );
});

export default DocumentChip;
