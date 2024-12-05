import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useQueryFilter(
    key: string,
    defaultValue: string[]
): [string[], React.Dispatch<React.SetStateAction<string[]>>] {
    const [searchParams, setSearchParams] = useSearchParams();

    const [value, setValue] = useState<string[]>(() => {
        const jsonValue = searchParams.getAll(key);
        if (jsonValue === null) return defaultValue;
        return jsonValue;
    });

    useEffect(() => {
        if (value.length === 0) {
            setSearchParams();
            return;
        }
        setSearchParams({ [key]: value });
    }, [value]);

    return [value, setValue];
}
