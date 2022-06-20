const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const jwtConfig = {
    // expiresIn: '15m',
    algorithm: 'HS256',
};

const generateJWTToken = (payload) => 
    jwt.sign(payload, JWT_SECRET, jwtConfig);

const authenticateToken = async (token) => {
    if (!token) {
        const err = { status: 401, message: 'Token not found' };
        throw err;
    }

    try {
        const introspection = await jwt.verify(token, JWT_SECRET, jwtConfig);
        return introspection;
    } catch (e) {
        const err = { status: 401, message: 'Expired or invalid token' };
        throw err;
    }
};

module.exports = {
    generateJWTToken,
    authenticateToken, 
};