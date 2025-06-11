//Middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  //set the default status code to 500(internal server error)
  const statuscode = res.statuscode !== 200 ? res.statuscode : 500;
  res.status(statuscode).json({
    status: "error",
    message: err.message || "Internal Server Error",
    details: err.details || null,
  });
};

module.exports = errorHandler;
