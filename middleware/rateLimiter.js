const rateLimit = require('express-rate-limit');

// Apply to all requests
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per 15 minutes
    message: 'Too many requests, please try again later.'
});

// Apply to login requests
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per 15 minutes
    message: 'Too many login attempts, please try again later.'
});


module.exports = {
    generalLimiter,
    loginLimiter
};