const { Router } = require('express');
const { login, registroPost, regsitroDelete } = require('../controllers/usuarios')
const router = Router();


router.get('/login', login);
router.post('/registro', registroPost);
router.delete('/usuario/:id', regsitroDelete);


module.exports = router;