const { Router } = require('express');
const { loginGet, registroPost, regsitroDelete, loginPost } = require('../controllers/usuarios');
const { checkDatosAlta, checkLogin, tokenActivo, } = require('../middlewares/usuario.midlewares');
const router = Router();


router.get('/login', tokenActivo, loginGet);
router.post('/login', checkLogin, loginPost);
router.post('/registro', checkDatosAlta, registroPost);
router.delete('/usuario/:id', regsitroDelete);


module.exports = router;