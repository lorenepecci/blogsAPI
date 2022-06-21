const express = require('express');

const router = express.Router();
const service = require('../services/serviceCategory');

const { authenticationMiddleware } = require('../middleware/auth');
const { validCategories } = require('../middleware/validData');

router.post('/', authenticationMiddleware, validCategories, async (req, res) => {
  try {
    const resp = await service.create(req.body);
    console.log('resp');
    res.status(201).json(resp);
  } catch (err) {
    console.log('err');
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

module.exports = router;