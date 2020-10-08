const ErrorReponse = require('../utils/ErrorReponse');
const errorHandler = (err, req, res, next) => {
  // console.log(err.stack);
  console.log(err)
  let error = { ...err }
  error.message = err.message

  if (err.name === 'CastError') {
    const message = `Resuource not found`;
    error = new ErrorReponse(message, 404);
  }

  if(err.code === 11000){
    const message = 'Duplicate firld value entered';
    error = new ErrorReponse(message,400)
  }

  if(err.name === 'ValidationError'){
    const message = Object.values(err.errors).map(val => val.message)
    error = new ErrorReponse(message,400)
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  })
}

module.exports = errorHandler;