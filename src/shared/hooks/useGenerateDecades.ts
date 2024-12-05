import { useMemo } from "react";
import { IDocument } from "../types";

export const useGenerateDecade = (documents: IDocument[]) => {
    const deacadance = useMemo(() => {
        const decadeGroups = documents.reduce(
            (acc: { name: string; id: number }[], doc: IDocument) => {
                const decade = Math.floor(doc.year / 10) * 10;
                const stringValue = `${decade}-${decade + 10}`;
                if (acc.findIndex((el) => el.name === stringValue) > -1) return acc;

                acc.push({ name: stringValue, id: decade });
                return acc;
            },
            []
        );
        return decadeGroups;
    }, [documents]);

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

    return deacadance;
};
