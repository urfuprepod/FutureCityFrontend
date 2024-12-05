import classNames from "classnames";
import { FC } from "react";
import Document from "src/assets/icons/document.svg";
import "./styles.css";

type Props = {
    fileExtension: string;
};
const DocumentIcon: FC<Props> = ({ fileExtension }) => {
    return (
        <div className="document-container">
            <img
                className={classNames("document__icon", fileExtension)}
                src={Document}
            />{" "}
            <span className="document__extension">{fileExtension}</span>
        </div>
    );
};

export default DocumentIcon;
