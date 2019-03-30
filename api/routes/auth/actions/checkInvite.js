const loadBookspaceFromInvite = require('../middleware/loadBookspaceFromInvite');

const checkInvite = [
    loadBookspaceFromInvite,
    (req, res, next) => {
        if (req.domainBookspace) {
            res.json({
                success: true,
                data: {bookspace: req.domainBookspace.getDataForAPI()},
            });
        } else {
            res.json({
                success: false,
            });
        }
    }
];

module.exports = checkInvite;