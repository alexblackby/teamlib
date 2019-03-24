const loadBookspace = (req, res, next) => {
    const user = req.currentUser;
    user.getBookspace()
        .then(bookspace => {
            req.currentBookspace = bookspace;
            next();
        })
        .catch(err => next(err));
};

module.exports = loadBookspace;