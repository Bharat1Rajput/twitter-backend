const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // the part ?. --->  “If the thing before ?. exists, then go ahead and access the next part; otherwise, just give me undefined without throwing an error.”
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'Invalid token.' });
        }   
        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticate;