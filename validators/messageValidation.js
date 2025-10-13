const { body, validationResult } = require("express-validator");

// ✅ Validation rules
exports.validateMessage = [
  body("senderId")
    .notEmpty().withMessage("Sender ID is required")
    .isMongoId().withMessage("Sender ID must be a valid MongoDB ID"),

  body("receiverId")
    .notEmpty().withMessage("Receiver ID is required")
    .isMongoId().withMessage("Receiver ID must be a valid MongoDB ID"),

  body("content")
    .notEmpty().withMessage("Message content is required")
    .isLength({ min: 1, max: 5000 }).withMessage("Message must be between 1 and 5000 characters"),

  // ✅ Middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => err.msg),
      });
    }
    next();
  },
];
