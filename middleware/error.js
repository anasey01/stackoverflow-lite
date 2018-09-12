
class handleError {
  static notFound(req, res, next) {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  }

  static serverError(error, req, res, next) {
    res.status(error.status || 500);
    res.json({
      success: false,
      error: {
        message: error.message,
      },
    });
  }
}


export default handleError;
