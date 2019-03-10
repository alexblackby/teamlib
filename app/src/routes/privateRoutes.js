import CatalogPage from "../components/catalog/CatalogPage";
import BookPage from "../components/catalog/BookPage";

const privateRoutes = [
    {
        path: '/',
        component: CatalogPage,
    },
    {
        path: '/book/:id',
        component: BookPage,
    },
];

export default privateRoutes;