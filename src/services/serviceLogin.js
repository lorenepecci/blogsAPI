const { User } = require('../database/models');
const { generateJWTToken } = require('../utils/generateJWT');

const authentication = async ({ email, password }) => {
    if (!email || !password) {
      throw Error({ status: 400, message: 'Some required fields are missing' });
    }

    const finduser = await User.findOne({
        attributes: ['displayName', 'email', 'password', 'image'],
        where: { email, password },
    });

    if (!finduser) {
      throw Error({ status: 400, message: 'Invalid fields' });
    }

    const token = generateJWTToken(JSON.stringify(finduser));
    return { token };
};

module.exports = {
    authentication,
};