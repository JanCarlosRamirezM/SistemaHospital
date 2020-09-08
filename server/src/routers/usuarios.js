const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {
	getUsuarios,
	crearUsuarios,
	actualizarUsuario,
	eliminarUsuario,
} = require('../controllers/usuarios');

const { validaCampos } = require('../middlewares/valida-campos');
const { validarJWT ,validarAdminRole, validarAdminRole_O_MismoUsuario} = require('../middlewares/validar-jwt');

/*
Ruta : /api/usuarios/
*/
router.get('/', [validarJWT], getUsuarios);

router.post(
	'/',
	[
		check('nombre', 'El nombre es obligatorio').notEmpty(),
		check('password', 'El password es obligatorio').notEmpty(),
		check('email', 'El email no es valido').isEmail(),
		validaCampos,
	],
	crearUsuarios
);

router.put(
	'/:id',
	[
		validarJWT,
		validarAdminRole_O_MismoUsuario,
		check('nombre', 'El nombre es obligatorio').notEmpty(),
		check('email', 'El email no es valido').isEmail(),
		check('role', 'El role es obligatorio').notEmpty(),
		validaCampos,
	],
	actualizarUsuario
);

router.delete('/:id', [validarJWT,validarAdminRole], eliminarUsuario);

module.exports = router;
