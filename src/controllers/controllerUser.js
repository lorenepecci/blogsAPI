const express = require('express');

const router = express.Router();
const service = require('../services/serviceUser');

router.post('/', async (req, res) => {
  const resp = await service.create(req.body);
  res.status(200).json(resp);  
});

module.exports = router;