export const delay = (ms) => (result) => new Promise(resolve => setTimeout(() => resolve(result), ms));
export const getCookie = (name) => {
    const b = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
};