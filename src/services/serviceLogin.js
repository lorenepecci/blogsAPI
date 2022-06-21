const { User } = require('../database/models');
const { generateJWTToken } = require('../utils/generateJWT');

const authentication = async (body) => {
  const { email, password } = body;
  if (!email || !password) {
    const err = { status: 400, message: 'Some required fields are missing' };
      throw err;
    }

    const finduser = await User.findOne({
        attributes: ['displayName', 'email', 'password', 'image'],
        where: { email, password },
    });

  if (!finduser) {
      const e = { status: 400, message: 'Invalid fields' };
      throw e;
    }

    const token = generateJWTToken(JSON.stringify(finduser));
    return { token };
};

module.exports = {
    authentication,
};