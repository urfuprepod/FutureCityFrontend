import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AvailableFilterValue, FilterFabric } from "../types";

export const useFilters = (filters: FilterFabric[]) => {
    function updateFilters(key: string, value: AvailableFilterValue) {
        if (value === undefined) return;
        const newFilters = { ...filterValue, [key]: value };

        setFilterValue(newFilters);
        const notEmptyValues = Object.fromEntries(
            Object.entries(newFilters).filter(([_, value]) => !!value) as [
                string,
                AvailableFilterValue
            ][]
        ) as Record<PropertyKey, string | string[]>;
        setSearchParams(notEmptyValues);
    }

    const [searchParams, setSearchParams] = useSearchParams();

    const [filterValue, setFilterValue] = useState<{
        [key: string]: AvailableFilterValue;
    }>(() => {
        return filters.reduce((acc, cur) => {
            return {
                ...acc,
                [cur.name]: cur.isMulti
                    ? searchParams.getAll(cur.name)
                    : searchParams.get(cur.name) ??
                      (cur.type === "input" ? "" : null),
            };
        }, {});
    });

    return { filter: filterValue, updateFilters };
};
