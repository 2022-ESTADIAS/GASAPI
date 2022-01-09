const { prices } = require('../controller/prices');
const {lugares} = require('../controller/places')

const router = require('express').Router();


router.get('/prices',prices);
router.get('/places',lugares)

module.exports = router;