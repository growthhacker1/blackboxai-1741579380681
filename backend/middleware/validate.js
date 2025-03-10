const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        errors
      });
    }

    next();
  };
};

const schemas = {
  masterSetup: {
    createBranch: Joi.object({
      code: Joi.string().required(),
      name: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string(),
      email: Joi.string().email(),
      status: Joi.string().valid('active', 'inactive')
    }),

    updateBranch: Joi.object({
      code: Joi.string(),
      name: Joi.string(),
      address: Joi.string(),
      phone: Joi.string(),
      email: Joi.string().email(),
      status: Joi.string().valid('active', 'inactive')
    }),

    createTruck: Joi.object({
      code: Joi.string().required(),
      name: Joi.string().required(),
      registrationNumber: Joi.string().required(),
      phone: Joi.string(),
      status: Joi.string().valid('active', 'inactive')
    }),

    updateTruck: Joi.object({
      code: Joi.string(),
      name: Joi.string(),
      registrationNumber: Joi.string(),
      phone: Joi.string(),
      status: Joi.string().valid('active', 'inactive')
    }),

    createDriver: Joi.object({
      code: Joi.string().required(),
      name: Joi.string().required(),
      licenseNumber: Joi.string().required(),
      phone: Joi.string(),
      email: Joi.string().email(),
      status: Joi.string().valid('active', 'inactive')
    }),

    updateDriver: Joi.object({
      code: Joi.string(),
      name: Joi.string(),
      licenseNumber: Joi.string(),
      phone: Joi.string(),
      email: Joi.string().email(),
      status: Joi.string().valid('active', 'inactive')
    })
  }
};

module.exports = {
  validate,
  schemas
};
