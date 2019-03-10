import {postFormData} from "./api";
import {setCurrentUser} from "../store/actions/auth";

export const login = ({email, password}) => {
    return postFormData('http://localhost:8080/auth/login', {email, password});
};


export const signup = ({email, name, password}) => {
    return postFormData('http://localhost:8080/auth/signup', {email, name, password});
};


export const verifyEmail = ({userid, code}) => {
    return postFormData('http://localhost:8080/auth/verify', {userid, code});
};