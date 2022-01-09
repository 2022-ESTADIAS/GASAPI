const { prices } = require('../controller/prices');

const router = require('express').Router();


router.get('/prices',prices);

module.exports = router;