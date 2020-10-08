const ErrorReponse = require('../utils/ErrorReponse');
const asyncHandler = require('../middleware/async');

exports.getHome = asyncHandler(async (req, res, next) => {
    res
        .status(200)
        .json({
            success: true,
            message: "Hello world"
        })
})