const Bookspace = require('../../../models/bookspace');

const loadBookspaceFromInvite = (req, res, next) => {
    const {subdomain, code} = req.params;
    Bookspace.findOne({subdomain, invite_codes: code})
        .then(bookspace => {
            req.domainBookspace = bookspace;
            next();
        })
        .catch(err => next(err));
};

module.exports = loadBookspaceFromInvite;