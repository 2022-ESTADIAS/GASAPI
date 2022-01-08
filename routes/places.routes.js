const { prices } = require('../controller/places');

const router = require('express').Router();


router.get('/places',prices);

module.exports = router;