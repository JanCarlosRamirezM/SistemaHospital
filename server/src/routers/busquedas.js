/*
 Busquedas
 ruta: /api/todo
*/
const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');

const { getTodo, getDocumentoColeccion } = require('../controllers/busquedas');


router.get('/:busqueda', [validarJWT], getTodo);
router.get('/coleccion/:tabla/:busqueda', [validarJWT], getDocumentoColeccion);

module.exports = router;
