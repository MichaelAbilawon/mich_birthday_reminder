const Joi = require("joi");
const winston = require("../controller/logger");

const registrationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  dateOfBirth: Joi.date().required().min("1-1-1900").max("now"),
});

const validateRegistration = (req, res, next) => {
  const { error, value } = registrationSchema.validate(req.body);

  if (error) {
    winston.error(`Error registering user: ${error.details[0].message}`);

    return res
      .status(400)
      .send(`Validation error: ${error.details[0].message}`);
  }

  req.body = value; // Replace req.body with the validated data
  next();
};

module.exports = validateRegistration;

const joi = require("joi");
