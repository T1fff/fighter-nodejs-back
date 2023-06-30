const responseMiddleware = async (req, res, next) => {
  try {
    const { error, type, message, ...rest } = req.body;
    if (error) {
      throw { message, type };
    }
    res.status(200).json({
      ...rest,
    });
  } catch (error) {
    const { message, type } = error;
    if (type === 400) {
      res.status(400).json({
        error: true,
        message: message,
      });
    } else if (type === 404) {
      res.status(404).json({
        error: true,
        message: message,
      });
    }
  } finally {
    next();
  }
};

export { responseMiddleware };
