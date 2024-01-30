const Joi = require("joi");

const registrationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  dateOfBirth: Joi.date().required(),
});

const validateRegistration = (req, res, next) => {
  const { error, value } = registrationSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  req.body = value; //Replace req.body with the validated data
  next();
};

module.exports = validateRegistration;
