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
    const resp = await service.getAll();
    res.status(200).json(resp);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});  

module.exports = router;