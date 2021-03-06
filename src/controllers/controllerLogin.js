const express = require('express');

const router = express.Router();
const service = require('../services/serviceLogin');

router.post('/', async (req, res) => {
  try {
    const resp = await service.authentication(req.body);
    res.status(200).json(resp);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
}); 

module.exports = router;