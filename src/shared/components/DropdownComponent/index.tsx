import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { DropdownItem } from "src/shared/types";
import styles from "./style.module.css";

type Props = {
    items: DropdownItem[];
};

const DropdownComponent: FC<PropsWithChildren<Props>> = ({
    children,
    items,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    function onDropdownTrigger(e: MouseEvent) {
        if (ref.current && !ref.current!.contains(e.target as Node)) {
            setIsDropdownOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", onDropdownTrigger);
        return () => {
            document.removeEventListener("click", onDropdownTrigger);
        };
    }, []);

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    return (
        <div
            ref={ref}
            className={styles["dropdown-container"]}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
            {children}{" "}
            <Dropdown
                items={items}
                isOpen={isDropdownOpen}
                closeDropdown={() => setIsDropdownOpen(false)}
            />
        </div>
    );
};

export default DropdownComponent;
