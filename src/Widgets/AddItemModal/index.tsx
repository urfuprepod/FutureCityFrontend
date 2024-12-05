import classNames from "classnames";
import styles from "./styles.module.css";
import { ModalHeader } from "src/entities/CreatingModal/components";
import Form from "../Form";
import { IFormField } from "src/shared/types";

type Props = {
    title?: string;
    description?: string;
    showed: boolean;
    closeShowed: () => void;
    onAccept: (data: any) => Promise<void>;
    defaultValues?: Record<string, any>;
    buttonTitle?: string;
    fields: IFormField[];
};

const AddItemModal = (props: Props) => {
    const { title, description, showed, closeShowed, buttonTitle, fields } =
        props;

    return (
        <>
            <div
                className={classNames(styles["modal-background"], {
                    [styles.none]: !showed,
                })}
            >
                <div
                    className={styles["modal-body"]}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles["scroll-container"]}>
                        <ModalHeader
                            title={title}
                            description={description}
                            closeShowed={closeShowed}
                        />
                        <Form fields={fields} />
                    </div>
                    <button>{buttonTitle || "Сохранить"}</button>
                </div>
            </div>
        </>
    );
};

export default AddItemModal;
