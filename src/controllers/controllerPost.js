const express = require('express');

const router = express.Router();
const service = require('../services/servicePost');

const { authenticationMiddleware } = require('../middleware/auth');
const { validPost } = require('../middleware/validData');

router.post('/', authenticationMiddleware, validPost, async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { email } = res.locals.payload;
    const resp = await service.create({ title, content, categoryIds }, email);
    res.status(201).json(resp);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

router.get('/', authenticationMiddleware, async (req, res) => {
  try {
    const { email } = res.locals.payload;
    const resp = await service.getAll(email);
    res.status(201).json(resp);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});  

/* router.get('/:id', authenticationMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await service.get(id);
    if (!resp) {
      const erro = { status: 404, message: 'User does not exist' };
      throw erro;
    }
    res.status(201).json(resp);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});  */

module.exports = router;