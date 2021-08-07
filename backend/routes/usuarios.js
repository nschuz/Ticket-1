const { Router } = require('express');
const { loginGet, registroPost, regsitroDelete, loginPost } = require('../controllers/usuarios');
const { checkDatosAlta } = require('../middlewares/usuario.midlewares');
const router = Router();


router.get('/login', loginGet);
router.post('/login', loginPost);
router.post('/registro', checkDatosAlta, registroPost);
router.delete('/usuario/:id', regsitroDelete);


module.exports = router;