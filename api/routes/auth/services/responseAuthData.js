const responseAuthData = (res, {user, bookspace, token}) => {
    const data = {
        user: user.getDataForAPI(),
        bookspace,
        token,
    };
    res.json({
        success: true,
        data
    });
};

module.exports = responseAuthData;