const { Router } = require('express');
const router = Router();
const { login, googleSigIn ,renewToken} = require('../controllers/login');

const { check } = require('express-validator');
const { validaCampos } = require('../middlewares/valida-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

/*
Ruta : /api/login/
*/
router.post(
	'/',
	[
		check('password', 'El password es obligatorio').not().isEmpty(),
		check('email', 'El email no es valido').isEmail(),
		validaCampos,
	],
	login
);
router.post('/google', [check('token', 'El token es obligatorio').not().isEmpty(), validaCampos], googleSigIn);

router.get('/renew', [validarJWT],renewToken);

module.exports = router;
