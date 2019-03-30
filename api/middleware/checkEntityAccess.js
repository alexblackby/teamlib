const checkEntityAccess = (actionName) => (req, res, next) => {

    req.entity.checkAccess(actionName, req.currentUser)
        .then(() => next())
        .catch(err => next(err));
};

module.exports = checkEntityAccess;