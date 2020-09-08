const jwt = require('jsonwebtoken');
const { response } = require('express');

const Usuario = require('../models/usuario');

const validarJWT = (req, res = response, next) => {
	try {
		const token = req.header('x-token');

		if (!token) {
			return res.status(401).json({
				ok: false,
				msg: 'No hay token en la petición',
			});
		}
		const { uid } = jwt.verify(token, process.env.JWT_SECRET);
		req.uid = uid;
		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'El token expiró o no es valido... revisar logs',
		});
	}
};

const validarAdminRole = async (req, res = response, next) => {
	try {
		const { uid } = req;
		const usuario = await Usuario.findById(uid);

		if (!usuario) {
			return res.status(404).json({
				ok: false,
				msg: 'Usuario no existe',
			});
		}

		if (usuario.role !== 'ADMIN_ROLE') {
			return res.status(403).json({
				ok: false,
				msg: 'No tiene privilegios para hacer eso',
			});
		}

		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado... revisar logs',
		});
	}
};

const validarAdminRole_O_MismoUsuario = async (req, res = response, next) => {
	try {
		const { uid } = req;
		const { id } = req.params;
		const usuario = await Usuario.findById(uid);

		if (!usuario) {
			return res.status(404).json({
				ok: false,
				msg: 'Usuario no existe',
			});
		}

		if (usuario.role === 'ADMIN_ROLE' || uid === id) {
			next();
		} else {
			return res.status(403).json({
				ok: false,
				msg: 'No tiene privilegios para hacer eso',
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado... revisar logs',
		});
	}
};
module.exports = {
	validarJWT,
	validarAdminRole,
	validarAdminRole_O_MismoUsuario,
};
