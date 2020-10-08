class ErrorReponse extends Error {
    constructor(message = "error", statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorReponse;