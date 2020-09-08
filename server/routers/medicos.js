/*
 Medicos
 ruta: /api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validaCampos } = require('../middlewares/valida-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
	getMedicos,
	crearMedicos,
	actualizarMedicos,
	eliminarMedicos,
	buscarMedico,
} = require('../controllers/medicos');

router.get('/', [validarJWT], getMedicos);

router.post(
	'/',
	[
		validarJWT,
		check('nombre', 'El nombre del medico es necesario').notEmpty(),
		check('hospital', 'El hospital id debe de ser valido').isMongoId(),
		validaCampos,
	],
	crearMedicos
);

router.put('/:id', [validarJWT], actualizarMedicos);

router.delete('/:id', [validarJWT], eliminarMedicos);

router.get('/:id', [validarJWT], buscarMedico);

module.exports = router;
