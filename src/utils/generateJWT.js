const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const jwtConfig = {
    // expiresIn: '15m',
    algorithm: 'HS256',
};

const generateJWTToken = (payload) => 
    jwt.sign(payload, JWT_SECRET, jwtConfig);

const authenticateToken = async (token) => {
    const introspection = await jwt.verify(token, JWT_SECRET, jwtConfig);
    return introspection;
};

module.exports = {
    generateJWTToken,
    authenticateToken, 
};