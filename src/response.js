const response = {
  created: (h, message, data) => {
    const result = h.response({
      status: 'success',
      message,
      data,
    });

    result.code(201);

    return result;
  },
  badRequest: (h, message) => {
    const result = h.response({
      status: 'fail',
      message,
    });

    result.code(400);

    return result;
  },
  notFound: (h, message) => {
    const result = h.response({
      status: 'fail',
      message,
    });

    result.code(404);

    return result;
  },
  serverError: (h, message) => {
    const result = h.response({
      status: 'fail',
      message,
    });

    result.code(500);

    return result;
  },
};

export default response;
