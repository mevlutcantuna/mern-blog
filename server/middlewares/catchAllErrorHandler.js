module.exports = function catchAllErrorHandler(err, req, res, next) {
  const statusCode = err.statusCode;
  const errorMessage = err.errorMessage;
  res.status(statusCode).send({ errorMessage });
  next();
};
