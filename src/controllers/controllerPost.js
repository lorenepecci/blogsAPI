const express = require('express');

const router = express.Router();
const service = require('../services/servicePost');

const { authenticationMiddleware } = require('../middleware/auth');
const { validPost, validUpdate } = require('../middleware/validData');

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
    const resp = await service.getAll();
    res.status(200).json(resp);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});  

router.get('/:id', authenticationMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await service.getId(id);
    if (!resp) {
      res.status(404).json({ message: 'Post does not exist' });
    }
    res.status(200).json(resp);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});  

router.put('/:id', authenticationMiddleware, validUpdate, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const { email } = res.locals.payload;
    const update = await service.update({ title, content }, email, id);
    if (!update) {
      return res.status(400).json({ message: 'Id Not found .' });
    }
    const resp = await service.getId(id);
    res.status(200).json(resp);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

module.exports = router;