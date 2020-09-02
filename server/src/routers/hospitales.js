/*
 Hospitales
 ruta: /api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validaCampos } = require('../middlewares/valida-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospital, crearHospital, actualizarHospital, eliminarHospital } = require('../controllers/hospitales');

router.get('/', [validarJWT], getHospital);

router.post(
	'/',
	[validarJWT, check('nombre', 'El nombre del hospital es necesario').notEmpty(), validaCampos],
	crearHospital
);

router.put(
	'/:id',
	[validarJWT, check('nombre', 'El nombre del hospital es necesario').notEmpty(), validaCampos],
	actualizarHospital
);

router.delete('/:id', [validarJWT], eliminarHospital);

module.exports = router;
