import get from 'lodash/get';
import CatalogPage from "../components/catalog/CatalogPage";
import BookPage from "../components/catalog/BookPage";
import LoginPage from "../components/auth/login/LoginPage";
import SignupPage from "../components/auth/signup/SignupPage";
import NeedVerificationPage from "../components/auth/verification/NeedVerificationPage";
import VerifyPage from "../components/auth/verification/VerifyPage";
import UserLayout from "../components/layout/UserLayout";
import GuestLayout from "../components/layout/GuestLayout";

const routeDefaults = {
    layout: UserLayout,
    needAuth: true,
};

const routes = [
    {
        path: '/login',
        component: LoginPage,
        layout: GuestLayout,
        needAuth: false,
    },
    {
        path: '/signup',
        component: SignupPage,
        layout: GuestLayout,
        needAuth: false,
    },
    {
        path: '/need-verification',
        component: NeedVerificationPage,
        layout: GuestLayout,
        needAuth: false,
    },
    {
        path: '/verify/:userid/:code',
        component: VerifyPage,
        layout: GuestLayout,
        needAuth: false,
    },
    {
        path: '/',
        component: CatalogPage,
    },
    {
        path: '/book/:id',
        component: BookPage,
    },
];


const applyDefaults = (routes) => routes.map(route => {
    return {
        ...route,
        needAuth: get(route, 'needAuth', routeDefaults.needAuth),
        layout: get(route, 'layout', routeDefaults.layout),
    };
});


export default applyDefaults(routes);