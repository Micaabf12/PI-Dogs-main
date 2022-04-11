const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const home = require('./home');
const dogs = require('./dogs');
const dog = require('./dog');
const temperaments = require('./temperaments');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/home', home);
router.use('/dog', dog);
router.use('/dogs', dogs);
router.use('/temperament', temperaments);

module.exports = router;