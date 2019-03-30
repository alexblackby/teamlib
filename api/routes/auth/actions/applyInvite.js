const loadBookspaceFromInvite = require('../middleware/loadBookspaceFromInvite');

const applyInvite = [
    loadBookspaceFromInvite,
    (req, res, next) => {
        const {currentUser: user, domainBookspace: bookspace} = req;
        if (bookspace) {
            user.bookspace_id = bookspace._id;
            user.save()
                .then(() => res.json({success: true}));
        } else {
            res.json({success: false});
        }
    }
];

module.exports = applyInvite;