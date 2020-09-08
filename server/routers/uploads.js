/*
 Busquedas
 ruta: /api/todo
*/
const { Router } = require('express');
const router = Router();
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload,retornarImagen } = require('../controllers/uploads');

router.use(expressFileUpload());
router.put('/:tipo/:id', [validarJWT], fileUpload);
router.get('/:tipo/:foto', retornarImagen);

module.exports = router;
