import classNames from "classnames";
import { FC } from "react";
import { DropdownItem } from "src/shared/types";
import styles from "./styles.module.css";

type Props = {
    isOpen: boolean;
    className?: string;
    items: DropdownItem[];
    closeDropdown: () => void;
};

const Dropdown: FC<Props> = (props) => {
    const { isOpen, className, items, closeDropdown } = props;

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={classNames(styles["dropdown"], className, {
                [styles.open]: isOpen,
            })}
        >
            {items.map((el) => (
                <span
                    className={styles["dropdown-item"]}
                    key={el.name}
                    onClick={() => {
                        el.onClick();
                        closeDropdown();
                    }}
                >
                    {el.name}
                </span>
            ))}
        </div>
    );
};

export default Dropdown;
