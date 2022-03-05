const { gasolinerasPorZonaDinamica} = require('../controller/zonasDinamicas');

const router = require('express').Router();


router.get('/zonas/:zona',gasolinerasPorZonaDinamica);





module.exports = router;