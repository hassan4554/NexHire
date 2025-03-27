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

const otpValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  otp: Joi.string().length(6).pattern(/^\d+$/).required().messages({
    "string.length": "OTP must be 6 digits",
    "string.pattern.base": "OTP must contain only numbers",
    "any.required": "OTP is required",
  }),
});

const emailValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
});

const loginValidationSchema = Joi.object({
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
});

module.exports = {
  passwordValidationSchema,
  otpValidationSchema,
  emailValidationSchema,
  loginValidationSchema,
};
