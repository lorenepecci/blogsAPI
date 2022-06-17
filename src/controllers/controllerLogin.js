const express = require('express');

const router = express.Router();
const service = require('../services/serviceLogin');

router.post('/', async (req, res) => {
  const resp = await service.authentication(req.body);
  res.status(200).json(resp);  
}); 

module.exports = router;