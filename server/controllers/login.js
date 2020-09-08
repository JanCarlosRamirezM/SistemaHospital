const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verifyId');
const { getMenu } = require('../helpers/menu-user');

const login = async (req, res = response) => {
	try {
		const { email, password } = req.body;

		const usuarioDB = await Usuario.findOne({ email });

		if (!usuarioDB) {
			return res.status(400).json({
				ok: false,
				msg: 'Usuario no encontrado',
			});
		}

		if (!bcrypt.compareSync(password, usuarioDB.password)) {
			return res.status(400).json({
				ok: false,
				msg: 'Usuario no (encontrado)',
			});
		}

		const token = await generarJWT(usuarioDB._id);
		res.json({
			ok: true,
			token,
			menu: getMenu(usuarioDB.role),
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado... revisar logs',
		});
	}
};

const googleSigIn = async (req, res = response) => {
	let { token } = req.body;
	try {
		const { name, email, picture } = await googleVerify(token);
		const usuarioDB = await Usuario.findOne({ email });
		let usuario;

		if (!usuarioDB) {
			usuario = new Usuario({
				nombre: name,
				email,
				password: '@@@',
				img: picture,
				google: true,
			});
		} else {
			usuario = usuarioDB;
			usuario.google = true;
		}

		await usuario.save();

		token = await generarJWT(usuario.id);

		res.json({
			ok: true,
			token,
			menu: getMenu(usuario.role),
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'El Token no es correcto... revisar logs',
		});
	}
};

const renewToken = async (req, res = response) => {
	const { uid } = req;

	token = await generarJWT(uid);

	const usuario = await Usuario.findById(uid);

	res.status(200).json({
		ok: true,
		token,
		usuario,
		menu: getMenu(usuario.role),
	});
};

module.exports = {
	login,
	googleSigIn,
	renewToken,
};
