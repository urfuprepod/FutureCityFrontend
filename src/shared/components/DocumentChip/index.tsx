import React, { FC } from "react";
import { IDocument } from "src/shared/types";
import { Card, DocumentHeader, Flex } from "src/shared/UI";
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
        <a href={`http://localhost:3000/` + 'static/' + document.file} download="myimage">
            <Card>
                <Flex className={className} gap={15} align="center">
                    <DocumentIcon fileExtension={extension} />
                    <Flex
                        style={{overflow: 'hidden'}}
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
            </Card>
        </a>
    );
});

export default DocumentChip;
