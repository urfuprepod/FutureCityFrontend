import classNames from "classnames";
import styles from "./styles.module.css";
import { ModalHeader } from "src/entities/CreatingModal/components";
import Form from "../Form";
import { forwardRef, useImperativeHandle } from "react";

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

const AddItemModal = forwardRef((props: Props, ref) => {
    const {
        title,
        description,
        showed,
        closeShowed,
        onAccept,
        defaultValues,
        fields,
    } = props;

    useImperativeHandle(
        ref,
        () => {
            return {
                sex: 3,
            };
        },
        []
    );

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
                        {showed && (
                            <Form
                                ref={ref}
                                defaultValues={defaultValues}
                                onSubmit={onAccept}
                                fields={fields}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
});

export default AddItemModal;
