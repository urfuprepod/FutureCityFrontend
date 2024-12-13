import { useEffect, useRef } from "react";

export const useEffectSkipFirstRender = (
    callback: () => void,
    ...args: any[]
) => {
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!isFirstRender.current) {
            callback();
        } else {
            isFirstRender.current = false;
        }
    }, [...args]);
};
