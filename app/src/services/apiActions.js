import axios from 'axios';

const defaultConfig = {
    baseURL: null,
    timeout: 10000,
    headers: {},
};

const storeConnection = {
    getState: null,
};

const addAuthHeader = (config) => {
    const token = storeConnection.getState().auth.token;
    return (token)
        ? {...config, headers: {...config.headers, Authorization: 'Bearer ' + token}}
        : config;
};

const request = ({method, url, data, config}) => {
    config = addAuthHeader({...defaultConfig, ...config});
    return axios({
        method,
        url,
        data,
        ...config
    });
};

const post = (url, data, config = {}) => {
    return request({method: 'post', url, data, config});
};

const put = (url, data, config = {}) => {
    return request({method: 'put', url, data, config});
};

const get = (url, config = {}) => {
    return request({method: 'get', url, data: {}, config});
};

const del = (url, config = {}) => {
    return request({method: 'delete', url, data: {}, config});
};

const configure = (domain, getState) => {
    defaultConfig.baseURL = domain;
    storeConnection.getState = getState;
};


export default {get, post, put, del, request, configure};