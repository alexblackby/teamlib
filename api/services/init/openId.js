const {Issuer} = require('openid-client');
const authConfig = require('../../config/auth');

exports.initOpenId = new Promise((resolve, reject) => {
    Issuer.discover(process.env.OAUTH_MICROSOFT_DISCOVER)
        .then(issuer => {
            authConfig.openId.providers.microsoft = {
                redirect_uri: process.env.OAUTH_MICROSOFT_REDIRECT_URI,
                getClient: (issuerFromJWT) => {
                    issuer.metadata.issuer = issuerFromJWT ? issuerFromJWT : issuer.metadata.issuer;
                    return new issuer.Client({
                        client_id: process.env.OAUTH_MICROSOFT_CLIENT_ID,
                        client_secret: process.env.OAUTH_MICROSOFT_SECRET,
                    });
                }
            };
            resolve();
        })
        .catch(err => reject(err));
});