const service = require('../services/servicePost');

const verifyId = async (req, res, next) => {
  const { id } = req.params;
  const resp = await service.getId(id);
    if (!resp) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
  next();
};

module.exports = verifyId;