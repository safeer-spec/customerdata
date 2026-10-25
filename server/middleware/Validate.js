const { body, validationResult } = require("express-validator");


const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

const registerRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  handleValidation,
];

const loginRules = [
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidation,
];

const customerRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone")
    .optional({ checkFalsy: true })
    .matches(/^[0-9+\-\s()]{7,15}$/)
    .withMessage("Invalid phone number"),
  body("status")
    .optional()
    .isIn(["lead", "active", "inactive"])
    .withMessage("Status must be lead, active or inactive"),
  handleValidation,
];

module.exports = { registerRules, loginRules, customerRules };
