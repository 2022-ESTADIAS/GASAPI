const { Precios,preciosPorId} = require('../controller/prices');
const {cantidadLugares,ubicacionLugares ,ubicacionLugaresUnSoloRegistro} = require('../controller/places')

const router = require('express').Router();


router.get('/prices',Precios);
router.get('/prices/:id',preciosPorId);
router.get('/places',cantidadLugares);
router.get('/general',ubicacionLugares);
router.get('/definitivo',ubicacionLugaresUnSoloRegistro);

module.exports = router;