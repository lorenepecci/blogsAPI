const { authenticateToken } = require('../utils/generateJWT');

const authenticationMiddleware = async (req, res, next) => {
    console.log('auth');
    const token = req.headers.authorization;

    const payload = await authenticateToken(token);

    res.locals.payload = payload;
    
    next();
};

module.exports = { authenticationMiddleware };