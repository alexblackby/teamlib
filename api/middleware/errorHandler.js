module.exports = function (error, req, res, next) {

    console.log(error);

    if (error.statusCode) {
        const response = {
            success: false,
            error: error.message,
            errorType: error.errorType ? error.errorType : undefined,
            data: error.data ? error.data : undefined,
        };
        res.status(error.statusCode).json(response);
        return;
    }

    res.status(500).json({
        success: false,
        error: error.message,
    });
};