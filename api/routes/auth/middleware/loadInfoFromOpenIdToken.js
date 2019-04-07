const {getJWTPayload} = require("../../../utils/helpers");

/**
 * Verify received JWT token (id_token).
 * Decrypt token and populate "req" with values from token payload.
 */
const loadInfoFromOpenIdToken = (config) => (req, res, next) => {
    const providerName = req.params.provider;
    const id_token = req.body.id_token;

    const provider = config.openId.providers[providerName];
    if (!provider) {
        next(new Error("OpenID client is not initialized for provider: " + providerName));
    }

    // Need to set "issuer" to received value, since Microsoft implementation doesn't conform with OIDC specification.
    // See https://github.com/panva/node-openid-client/issues/58
    const unverifiedPayload = getJWTPayload(id_token);
    const client = provider.getClient(unverifiedPayload.iss);

    const checks = {
        response_type: 'id_token',
        nonce: config.openId.nonce,
    };

    // Validation of signature and checking token params:
    client.authorizationCallback(provider.redirect_uri, {id_token}, checks)
        .then(function (tokenSet) {
            const payload = getJWTPayload(id_token);
            if (payload.email && payload.name && payload.sub) {
                req.body.email = payload.email.toLowerCase();
                req.body.name = payload.name;
                req.body.openIdSub = payload.sub;
                next();
            } else {
                next(new Error('Could not get required claims from token'));
            }
        })
        .catch(err => {
            next(new Error('Received id_token is not valid'));
        });
};

module.exports = loadInfoFromOpenIdToken;