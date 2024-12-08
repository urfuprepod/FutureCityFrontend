import { documents } from "src/shared/constants";
import { IDocument } from "src/shared/types";

export const getDocumentsByAuthorId = async (
    authorId: number
): Promise<IDocument[]> => {
    const filtered = documents.filter((el) => el.authorId === authorId);
    return await new Promise<IDocument[]>((resolve, reject) => {
        setTimeout(() => resolve(filtered), 200);
    });
};
