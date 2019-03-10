import LoginPage from "../components/auth/login/LoginPage";
import SignupPage from "../components/auth/signup/SignupPage";
import NeedVerificationPage from "../components/auth/verification/NeedVerificationPage";
import VerifyPage from "../components/auth/verification/VerifyPage";

const publicRoutes = [
    {
        path: '/login',
        component: LoginPage,
    },
    {
        path: '/signup',
        component: SignupPage,
    },
    {
        path: '/need-verification',
        component: NeedVerificationPage,
    },
    {
        path: '/verify/:userid/:code',
        component: VerifyPage,
    },
];

export default publicRoutes;