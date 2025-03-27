const Joi = require("joi");

const passwordValidationSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(50)
    .required()
    .custom((value, helpers) => {
      if (!/[a-z]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one lowercase letter",
        });
      if (!/[A-Z]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one uppercase letter",
        });
      if (!/\d/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one digit",
        });
      if (!/[@$!%*,?&]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one special character",
        });

      return value;
    })
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
      "any.invalid": "{{#message}}",
    }),
  newPassword: Joi.string()
    .min(8)
    .max(50)
    .required()
    .custom((value, helpers) => {
      if (!/[a-z]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one lowercase letter",
        });
      if (!/[A-Z]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one uppercase letter",
        });
      if (!/\d/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one digit",
        });
      if (!/[@$!%*,?&]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one special character",
        });

      return value;
    })
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
      "any.invalid": "{{#message}}",
    }),
  confirmNewPassword: Joi.string()
    .required()
    .valid(Joi.ref("newPassword"))
    .messages({
      "any.only": "Confirm password must match the password",
      "any.required": "Confirm password is required",
    }),
});

module.exports = passwordValidationSchema;
