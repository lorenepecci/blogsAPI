const { authenticateToken } = require('../utils/generateJWT');

const authenticationMiddleware = async (req, res, next) => {
    console.log('auth');
    const token = req.headers.authorization;
    if (!token) {
        const err = { status: 401, message: 'Token not found' };
        return res.status(err.status).json({ message: err.message });
    }
    try {
        const payload = await authenticateToken(token);
        res.locals.payload = payload;
    } catch (err) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
    
    next();
};

module.exports = { authenticationMiddleware };