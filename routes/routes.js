const { prices,pricesById} = require('../controller/prices');
const {lugares} = require('../controller/places')

const router = require('express').Router();


router.get('/prices',prices);
router.get('/prices/:id',pricesById);
router.get('/places',lugares);

module.exports = router;