import {
    FormState,
    UseFormGetValues,
    UseFormReset,
    UseFormSetValue,
} from "react-hook-form";

export interface ICityFuture {
    id: number;
    name: string;
}

export type File = {
    id: number;
    url?: string;
    extension?: string;
};

export interface ITag {
    id: number;
    name: string;
    futureStatusId: number;
}

export type ITagBody = Pick<ITag, "name" | "futureStatusId">;

export interface IDocument {
    id: number;
    title: string;
    year: number;
    file: string;
    cityStatus: ICityFuture;
    futureStatusId: number;
    tags: ITag[];
    authors: IAuthor[]
}

export type IDocumentBody = {
    title: string;
    file: File;
    year: number;
    tagIds: number[];
    status: number;
};

export interface IAuthor {
    id: number;
    fullName: string;
    avatarUrl?: string;
    biography?: string;
    documents: IDocument[];
}

export interface IUser {
    id: number;
    login: string;
    lastName: string;
    firstName: string;
    isAdmin: boolean;
}

export type IUserBody = Omit<IUser, "id" | "isAdmin"> & { password: string };

export interface IRoute {
    path: string;
    name: string;
    Icon?: JSX.Element;
    Component: JSX.Element;
    inDrawer?: boolean;
    userValidate?: (user?: IUser) => boolean
}

export type GraphValue = {
    name: string;
    count: number;
    futureStatus?: string;
};

// system

type FilterType = "select" | "input";

export type AvailableFilterValue = string | string[] | null;

export type FilterFabric = {
    name: string;
    label: string;
    type: FilterType;
    placeholder?: string;
    isMulti?: boolean;
    options?: {
        id: number;
        [key: string]: any;
    }[];
    labelField?: string;
};

export type FormHandle = {
    formState: FormState<Record<string, any>>;
    getValues: UseFormGetValues<Record<string, any>>;
    setValue: UseFormSetValue<Record<string, any>>;
    reset: UseFormReset<Record<string, any>>;
};

export type DropdownItem = {
    name: string;
    onClick: () => void;
}