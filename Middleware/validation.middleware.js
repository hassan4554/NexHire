const validateData = (validationSchema, dataType = "body") => {
  return (req, res, next) => {
    const { error } = validationSchema.validate(req[dataType], {
      abortEarly: true,
    });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    next();
  };
};

module.exports = { validateData };
