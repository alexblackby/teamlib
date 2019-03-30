export const delay = (ms) => (result) => new Promise(resolve => setTimeout(() => resolve(result), ms));

export const getSubDomain = () => {
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

