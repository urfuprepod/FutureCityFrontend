import {
    AuthorProfile,
    AuthorsPage,
    DocumentsPage,
    LoginPage,
    MainPage,
    TagsPage,
    UsersPage,
} from "src/pages";
import { IAuthor, ICityFuture, IDocument, IRoute, ITag, IUser } from "./types";
import {
    FileText,
    House,
    NotebookPen,
    ScanEye,
    Tags,
    UserRoundPen,
    Users,
} from "lucide-react";


export const routes: IRoute[] = [
    {
        name: "Главная",
        path: "/",
        Icon: <House />,
        Component: <MainPage />,
    },
    {
        name: "Авторы",
        path: "/authors",
        Icon: <NotebookPen />,
        Component: <AuthorsPage />,
    },
    {
        name: "",
        path: "/authors/:id",
        inDrawer: false,
        Component: <AuthorProfile />,
    },
    {
        name: "Документы",
        path: "/documents",
        Icon: <FileText />,
        Component: <DocumentsPage />,
    },
    {
        name: "Теги",
        path: "/tags",
        Icon: <Tags />,
        Component: <TagsPage />,
    },
    {
        name: "Пользователи",
        path: "/users",
        Icon: <Users />,
        Component: <UsersPage />,
        userValidate: (user?: IUser) => !!user?.isAdmin,
    },
    {
        name: "Логин",
        path: "/login",
        inDrawer: false,
        Icon: <ScanEye />,
        Component: <LoginPage isRegistry={false} />,
        userValidate: (user) => !user,
    },
    {
        name: "Регистрация",
        path: "/register",
        inDrawer: false,
        Icon: <ScanEye />,
        Component: <LoginPage isRegistry />,
        userValidate: (user) => !user,
    },
];
