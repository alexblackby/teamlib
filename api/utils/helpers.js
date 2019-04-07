exports.removeUndefined = (obj) => {
    const payload = {};
    Object.keys(obj).forEach(param => {
        if (typeof obj[param] !== typeof undefined) {
            payload[param] = obj[param];
        }
    });
    return payload;
};


exports.getJWTPayload = (token) => {
    const payloadBase64 = token.split('.')[1];
    const decodedString = Buffer.from(payloadBase64, 'base64').toString();
    return JSON.parse(decodedString);
};