const Joi = require("joi");

const userValidationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.min": "Name must be at least 3 characters long",
      "string.pattern.base": "Name can only contain letters and spaces",
      "any.required": "Name is required",
    }),

  username: Joi.string()
    .min(6)
    .max(30)
    .required()
    .custom((value, helpers) => {
      if (!/^[a-z0-9_.]+$/.test(value)) {
        return helpers.error("any.invalid", {
          message:
            "Username can only contain lowercase letters, numbers, dots, and underscores",
        });
      }
      if (/^[._]/.test(value)) {
        return helpers.error("any.invalid", {
          message: "Username cannot start with a dot or underscore",
        });
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("any.invalid", {
          message: "Username must include at least one lowercase letter",
        });
      }
      if (!/\d/.test(value)) {
        return helpers.error("any.invalid", {
          message: "Username must include at least one digit",
        });
      }
      return value;
    })
    .messages({
      "string.min": "Username must be at least 6 characters long",
      "any.required": "Username is required",
      "any.invalid": "{{#message}}", // Custom messages from the validation logic
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),

  contact: Joi.string()
    .length(12)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.length": "Contact number must be exactly 12 digits",
      "string.pattern.base": "Contact number must contain only digits",
      "any.required": "Contact number is required",
    }),

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
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Confirm password must match the password",
    "any.required": "Confirm password is required",
  }),
});

module.exports = userValidationSchema;
