import React, { FC } from "react";
import styles from "./styles.module.css";

type Props = {
    fileExtension?: string;
};

const dictionary: Record<string, string> = {
    doc: "#0263d1",
    docx: "#0263d1",
    pdf: "#f15642",
};

const File: FC<Props> = React.memo((props) => {
    const { fileExtension } = props;

    const extension = fileExtension ?? '';

    const actualColor: string = dictionary[extension] ?? "#ffc107";

    return (
        <button className={styles.file}>
            <svg
                width="30"
                height="40"
                viewBox="0 0 37 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M4 48H33C35.2091 48 37 46.2091 37 44V10L27 0H4C1.79086 0 0 1.79086 0 4V44C0 46.2091 1.79086 48 4 48Z"
                    color={actualColor}
                    // className="document__img-body"
                ></path>{" "}
                <g>
                    <path
                        d="M29 10H37L27 0V8C27 9.10457 27.8954 10 29 10Z"
                        color="#997f30"
                    ></path>
                </g>
            </svg>
            <span className={styles.file__extension}>
                {extension.slice(0, 4)}
            </span>
        </button>
    );
});

export default File;
