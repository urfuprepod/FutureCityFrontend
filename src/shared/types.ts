export type CityFuture = "Utopia" | "Antiutopia";

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

export interface IDocument {
    id: number;
    title: string;
    year: number;
    file: string;
    cityStatus: ICityFuture;
    futureStatusId: number;
    tags: ITag[];
    authorId: number;
}

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
    avatarUrl: string;
    isAdmin: boolean;
}

export interface IRoute {
    path: string;
    name: string;
    Icon: JSX.Element,
    Component: JSX.Element;
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
    labelField?: string
};


// form
export type FormFileldType = 'input' | 'textarea' | 'select' | 'file' | 'image'

export interface IFormField  {
    name: string;
    type: FormFileldType;
    label: string;
    isRequired?: boolean;
    span?: number;
    url?: string;
}