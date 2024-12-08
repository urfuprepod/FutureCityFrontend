import { useEffect, useMemo, useRef, useState } from "react";

export function usePagination<T>(items?: T[], perPage?: number) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = useRef(perPage ?? 10);

    const pageCounts = useMemo(() => {
        if (!items) return { pageCounts: 0, currentItems: [] };
        const counts = Math.ceil(items.length / itemsPerPage.current);
        const currentItems = items.slice(
            itemsPerPage.current * (currentPage - 1),
            currentPage * itemsPerPage.current
        );
        return {
            pageCounts: counts,
            currentItems,
        };
    }, [itemsPerPage.current, items, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [items]);

    function updatePage(value: number) {
        setCurrentPage(value);
    }

    return {
        pageCounts,
        currentPage,
        updatePage,
        itemsPerPage: itemsPerPage.current,
    };
}
