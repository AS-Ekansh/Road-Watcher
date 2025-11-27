export const sendSuccess = (res, status, message, data = null) => {
  return res.status(status).json({
    success: true,
    status,
    message,
    data,
  });
};

export const sendError = (res, status, message) => {
  return res.status(status).json({
    success: false,
    status,
    message,
  });
};
