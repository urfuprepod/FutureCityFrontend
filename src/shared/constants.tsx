import { AuthorProfile, AuthorsPage, DocumentsPage, LoginPage, MainPage, TagsPage, UsersPage } from "src/pages";
import { IAuthor, ICityFuture, IDocument, IRoute, ITag } from "./types";
import { FileText, House, NotebookPen, ScanEye, Tags, UserRoundPen, Users } from "lucide-react";

export const futureStatuses: ICityFuture[] = [
    { id: 0, name: "Утопия" },
    { id: 1, name: "Антиутопия" },
];
export const tags: ITag[] = [
    { id: 0, name: "Стерильность", futureStatusId: 0 },
    { id: 1, name: "Стеклянный дом", futureStatusId: 0 },
    { id: 2, name: "Экологичность", futureStatusId: 0 },
    { id: 3, name: "Разрисованные стены", futureStatusId: 0 },

    { id: 5, name: "Расцвет культуры", futureStatusId: 0 },
    { id: 6, name: "Машинный труд", futureStatusId: 0 },
    { id: 7, name: "Медицина", futureStatusId: 0 },
    { id: 8, name: "Культура", futureStatusId: 0 },

    { id: 9, name: "Война", futureStatusId: 1 },
    { id: 10, name: "Ядерная зима", futureStatusId: 1 },
    { id: 11, name: "Загрязнение", futureStatusId: 1 },
    { id: 12, name: "Уничтожение человечества", futureStatusId: 1 },
    { id: 13, name: "Деградация", futureStatusId: 1 },
    { id: 14, name: "Рабство", futureStatusId: 1 },
];

export const documents: IDocument[] = [
    {
        id: 0,
        title: "Москва в 1933",
        year: 2014,
        authorId: 1,
        file: "test.pdf",
        tags: tags.slice(0, 4),
        cityStatus: futureStatuses[0],
        futureStatusId: 0,
    },
    {
        id: 1,
        title: "Мир в 1956",
        year: 2008,
        authorId: 1,
        file: "https://www.100bestbooks.ru/files/London_Lyubov_k_zhizni.pdf",
        tags: tags.slice(9, 12),
        cityStatus: futureStatuses[1],
        futureStatusId: 1,
    },
    {
        id: 2,
        title: "Город в представлении советского рабочего",
        authorId: 1,
        year: 2010,
        file: "https://www.100bestbooks.ru/files/London_Lyubov_k_zhizni.pdf",
        tags: [tags[0], tags[2], tags[6], tags[5]],
        cityStatus: futureStatuses[0],
        futureStatusId: 0,
    },
    {
        id: 3,
        authorId: 2,
        title: "Город Маяковского",
        year: 1985,
        file: "https://www.100bestbooks.ru/files/London_Lyubov_k_zhizni.pdf",
        tags: tags.slice(0, 5),
        cityStatus: futureStatuses[0],
        futureStatusId: 0,
    },
    {
        id: 4,
        authorId: 2,
        title: "Конец пассионарности",
        year: 1978,
        file: "https://www.100bestbooks.ru/files/London_Lyubov_k_zhizni.pdf",
        tags: [tags[8], tags[9], tags[11]],
        cityStatus: futureStatuses[1],
        futureStatusId: 1,
    },
    {
        id: 5,
        authorId: 2,
        title: "Город для ученого",
        year: 1981,
        file: "https://www.100bestbooks.ru/files/London_Lyubov_k_zhizni.pdf",
        tags: [tags[8], tags[12], tags[13]],
        cityStatus: futureStatuses[1],
        futureStatusId: 1,
    },
    {
        id: 6,
        authorId: 2,
        title: "Город для преподавателя",
        year: 1989,
        file: "https://www.100bestbooks.ru/files/London_Lyubov_k_zhizni.pdf",
        tags: [tags[8], tags[12], tags[13]],
        cityStatus: futureStatuses[1],
        futureStatusId: 1,
    },
];

export const authors: IAuthor[] = [
    {
        id: 1,
        fullName: "Пантелеев Алексей Дмитриевич",
        avatarUrl:
            "https://bioslovhist.spbu.ru/images/persons/2361/2361--1ZQ670eB-.jpg",
        biography:
            "Кандидат исторических наук, доцент кафедры истории древней Греции и Рима Санкт-Петербургского государственного университета",
        documents: documents.slice(0, 3),
    },

    {
        id: 2,
        fullName: "Гумилев Лев Николаевич",
        avatarUrl:
            "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65671a83e129441f1facaf33_6567270d4f336820c322cd72/scale_1200",
        biography:
            "Советский и российский учёный, писатель и переводчик. Археолог, востоковед и географ, историк, этнолог, философ. Доктор исторических (1961) наук. Создатель пассионарной теории этногенеза",
        documents: documents.slice(3),
    },
];

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
        Component: <AuthorProfile />,
    },
    {
        name: "Документы",
        path: "/documents",
        Icon: <FileText />,
        Component: <DocumentsPage />,
    },
    {
        name: 'Теги',
        path: '/tags',
        Icon: <Tags />,
        Component: <TagsPage />
    },
    {
        name: 'Пользователи',
        path: '/users',
        Icon: <Users />,
        Component: <UsersPage />
    },
    {
        name: 'Логин',
        path: '/login',
        Icon: <ScanEye />,
        Component: <LoginPage isRegistry={false} />
    }
];
