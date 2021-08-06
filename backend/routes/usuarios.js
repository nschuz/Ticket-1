const { Router } = require('express');
const { login } = require('../controllers/usuarios')
const router = Router();


router.get('/login', login);


module.exports = router;