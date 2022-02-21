const { Precios,preciosPorId} = require('../controller/prices');
const {cantidadLugares,ubicacionLugares ,ubicacionLugaresUnSoloRegistro} = require('../controller/places')
const { gasolinerasPorZona} = require('../controller/zonas');
const { gasolinerasPorZonaDinamica} = require('../controller/zonasDinamicas');

const router = require('express').Router();


router.get('/prices',Precios);
router.get('/prices/:id',preciosPorId);
router.get('/places',cantidadLugares);
router.get('/general',ubicacionLugares);
router.get('/definitivo',ubicacionLugaresUnSoloRegistro);
router.get('/zonas/:zona',gasolinerasPorZonaDinamica);

module.exports = router;