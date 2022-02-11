const response = {
  created: (h, message, data) => {
    const result = h.response({
      status: 'success',
      message: message,
      data: data,
    });

    result.code(201);

    return result;
  },
  badRequest: (h, message) => {
    const result = h.response({
      status: 'fail',
      message: message,
    });

    result.code(400);

    return result;
  },
  serverError: (h, message) => {
    const result = h.response({
      status: 'fail',
      message: message,
    });

    result.code(500);

    return result;
  },
};

export default response;
