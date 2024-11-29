import { useMemo } from "react";
import { IDocument } from "../types";

export const useGenerateDecade = (documents: IDocument[]) => {
    const decades = useMemo(() => {
        const decadeGroups = documents.reduce(
            (acc: Map<number, IDocument[]>, doc: IDocument) => {
                const decade = Math.floor(doc.year / 10) * 10;
                if (!acc.has(decade)) {
                    acc.set(decade, [doc]);
                } else {
                    acc.get(decade)?.push(doc);
                }
                return acc;
            },
            new Map<number, IDocument[]>()
        );
        new Map([...decadeGroups.entries()].sort());
    }, [documents]);

    return decades;
};
