export const delay = (ms) => (result) => new Promise(resolve => setTimeout(() => resolve(result), ms));

export const getSubdomain = () => {
    return window.location.hostname.split('.')[0];
};

export const getMainDomain = () => {
    const hostParts = window.location.hostname.split('.');
    return hostParts.slice(1).join('.');
};

export const setCookie = (name, value, maxAge = 86400) => {
    document.cookie = name + "=" + value + ";domain=" + getMainDomain() + ";path=/;max-age=" + maxAge;
};

export const deleteCookie = (name) => {
    document.cookie = name + '=;domain=' + getMainDomain() + ';path=/';
};

export const getCookie = (name) => {
    const b = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
};

export const getUrlParam = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const getHashParam = (name) => {
    var hash = window.location.hash.substr(1);
    var result = hash.split('&').reduce(function (result, item) {
        var parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {});
    return result[name];
};

export const getJWTPayload = (token) => {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return;
    const base64DecodeUnicode = (str) => {
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    };
    return JSON.parse(base64DecodeUnicode(payloadBase64));
};

export const doNothing = () => {
    // this empty function can be used in "catch" if we want to skip errors
};

export const timeInSeconds = {
    minute: 60,
    tenMinutes: 600,
    hour: 3600,
    day: 86400,
};