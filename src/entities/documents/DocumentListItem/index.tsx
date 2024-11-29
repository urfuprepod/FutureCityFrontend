import { FC } from "react";
import { IDocument } from "src/shared/types";
import { DocumentCard, FileButton, Title6 } from "src/shared/UI";

type Props = {
    document: IDocument;
};

const DocumentListItem: FC<Props> = (props) => {
    const {
        document: {
            title,
            file: { extension },
        },
    } = props;

    return (
        <DocumentCard>
            <span></span> <Title6>{title}</Title6>{" "}
            <FileButton fileExtension={extension} />
        </DocumentCard>
    );
};

export default DocumentListItem;
