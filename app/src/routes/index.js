import get from 'lodash/get';
import CatalogPage from "../components/catalog/CatalogPage";
import BookPage from "../components/catalog/BookPage";
import LoginPage from "../components/auth/login/LoginPage";
import SignupPage from "../components/auth/signup/SignupPage";
import NeedVerificationPage from "../components/auth/verification/NeedVerificationPage";
import VerifyPage from "../components/auth/verification/VerifyPage";
import CatalogLayout from "../components/layout/CatalogLayout";
import SimpleLayout from "../components/layout/SimpleLayout";
import BookspaceSelectPage from "../components/bookspace/select/BookspaceSelectPage";
import BookspaceCreatePage from "../components/bookspace/create/BookspaceCreatePage";
import LogoutPage from "../components/auth/logout/LogoutPage";
import BookspaceOnboardingPage from "../components/bookspace/onboarding/BookspaceOnboardingPage";

const routeDefaults = {
    layout: CatalogLayout,
    needAuth: true,
    needBookspace: true,
};

const routes = [
    {
        path: '/login',
        component: LoginPage,
        layout: SimpleLayout,
        needAuth: false,
    },
    {
        path: '/logout',
        component: LogoutPage,
        layout: SimpleLayout,
        needAuth: true,
        needBookspace: false,
    },
    {
        path: '/signup',
        component: SignupPage,
        layout: SimpleLayout,
        needAuth: false,
    },
    {
        path: '/need-verification',
        component: NeedVerificationPage,
        layout: SimpleLayout,
        needAuth: false,
    },
    {
        path: '/verify/:userid/:code',
        component: VerifyPage,
        layout: SimpleLayout,
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
    {
        path: '/bookspace/select',
        component: BookspaceSelectPage,
        layout: SimpleLayout,
        needBookspace: false,
    },
    {
        path: '/bookspace/create',
        component: BookspaceCreatePage,
        layout: SimpleLayout,
        needBookspace: false,
    },
    {
        path: '/bookspace/welcome',
        component: BookspaceOnboardingPage,
        layout: SimpleLayout,
    },
];


const applyDefaults = (routes) => routes.map(route => {
    Object.keys(routeDefaults).forEach((key) => {
        route[key] = get(route, key, routeDefaults[key]);
    });
    return route;
});


export default applyDefaults(routes);