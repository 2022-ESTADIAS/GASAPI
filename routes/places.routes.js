const { places } = require('../controller/places');

const router = require('express').Router();


router.get('/places',places);

module.exports = router;