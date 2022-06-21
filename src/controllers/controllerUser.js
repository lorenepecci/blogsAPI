const express = require('express');

const router = express.Router();
const service = require('../services/serviceUser');

const { authenticationMiddleware } = require('../middleware/auth');
const { validUser } = require('../middleware/validData');

router.post('/', validUser, async (req, res) => {
  try {
    const resp = await service.create(req.body);
    res.status(201).json(resp);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

router.get('/', authenticationMiddleware, async (req, res) => {
  try {
    const resp = await service.getAll();
    res.status(200).json(resp);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
}); 

router.get('/:id', authenticationMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await service.get(id);
    if (!resp) {
      const erro = { status: 404, message: 'User does not exist' };
      throw erro;
    }
    res.status(200).json(resp);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
}); 

router.delete('/me', authenticationMiddleware, async (_req, res) => {
  try {
    const { email } = res.locals.payload;
    await service.remove(email);
    res.status(204).end();
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

module.exports = router;