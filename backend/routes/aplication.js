const { Router } = require('express');
const { homeGet, presupuestoGet } = require('../controllers/aplication');
const { validarJWT } = require('../middlewares/usuario.midlewares');
const router = Router();


router.get('/home', validarJWT, homeGet);
router.get('/presupuesto', validarJWT, presupuestoGet);


module.exports = router;