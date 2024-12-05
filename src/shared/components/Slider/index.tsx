import React, { useRef } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

interface Props {
    children: React.ReactElement;
    step?: number;
    isDark?: boolean;
}

const Slider = (props: Props) => {
    const { children, isDark, step = 150 } = props;

    const sliderRef = useRef<HTMLElement | null>(null);
    const scrollLeft = () => {
        if (!sliderRef.current) return;
        sliderRef.current.scrollLeft -= step;
    };

    const scrollRight = () => {
        if (!sliderRef.current) return;
        sliderRef.current.scrollLeft += step;
    };

    return (
        <div className={classNames(styles.slider, { [styles.dark]: isDark })}>
            <button onClick={scrollLeft} className={styles.arrow}>
                {"<"}
            </button>
            {React.cloneElement(children, { ref: sliderRef })}
            <button onClick={scrollRight} className={styles.arrow}>
                {">"}
            </button>
        </div>
    );
};

export default Slider;
