exports.removeUndefined = (obj) => {
    const payload = {};
    Object.keys(obj).forEach(param => {
        if (typeof obj[param] !== typeof undefined) {
            payload[param] = obj[param];
        }
    });
    return payload;
};