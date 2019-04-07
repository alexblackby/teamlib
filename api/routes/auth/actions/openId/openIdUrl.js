/**
 * Returns OpenID provider's URL to which we should redirect user to perform OpenID auth.
 */
const openIdUrl = (config) => [
    (req, res, next) => {
        const providerName = req.params.provider;
        const provider = config.openId.providers[providerName];
        if (!provider) {
            next(new Error("OpenID client is not initialized for provider: " + providerName));
        }

        const client = provider.getClient();
        const url = client.authorizationUrl({
            redirect_uri: provider.redirect_uri,
            scope: config.openId.scope,
            response_type: config.openId.response_type,
            nonce: config.openId.nonce,
        });
        res.send({
           success: true,
           data: {
               url,
           }
        });
    }
];

module.exports = openIdUrl;