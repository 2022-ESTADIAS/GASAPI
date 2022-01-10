const { prices,pricesById} = require('../controller/prices');
const {lugares,lugaresPlaces} = require('../controller/places')

const router = require('express').Router();


router.get('/prices',prices);
router.get('/prices/:id',pricesById);
router.get('/places',lugares);
router.get('/general',lugaresPlaces);

module.exports = router;