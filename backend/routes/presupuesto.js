const { Router } = require('express');
const { presupuestosGet, presupuestoPost, presupuestoPut, presupuestoDelete } = require('../controllers/presupuesto');

const router = Router();


router.get('/presupuestos', presupuestosGet);
router.post('/presupuesto-post', presupuestoPost);
router.put('/presupuesto-update/:id', presupuestoPut);
router.delete('/presupuesto-delete/:id', presupuestoDelete);


module.exports = router;