const validateSchema = (schema, body) => {
  const { error } = schema.validate(body, { abortEarly: false });
  if (error) {
    const errorObjects = error.details.reduce((acc, err) => {
      acc[err.context.key] = err.message;
      return acc;
    }, {});
    return {
      error: { statusCode: 400, status: "Failed", error: errorObjects },
    };
  }
  return { message: "Validations Passed" };
};

module.exports = { validateSchema };
