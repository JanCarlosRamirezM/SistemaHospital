const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
	const desde = Number(req.query.desde) || 0;
	const hasta = Number(req.query.hasta) || 0;

	const [usuarios, total] = await Promise.all([
		Usuario.find({}, 'nombre email role google').skip(desde).limit(hasta),
		Usuario.countDocuments(),
	]);
	res.status(200).json({
		ok: true,
		usuarios,
		total,
	});
};

const crearUsuarios = async (req, res = response) => {
	try {
		const { email, password } = req.body;

		const existeUsuario = await Usuario.findOne({ email });
		if (existeUsuario) {
			return res.status(400).json({
				ok: false,
				msg: 'El correo ya esta registrado',
			});
		}

		const usuario = new Usuario(req.body);
		usuario.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
		await usuario.save();

		const token = await generarJWT(usuario._id);

		res.status(200).json({
			ok: true,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado... revisar logs',
		});
	}
};

const actualizarUsuario = async (req, res = response) => {
	try {
		const uid = req.params.id;

		const usuarioDB = await Usuario.findById(uid);

		if (!usuarioDB) {
			return res.status(400).json({
				ok: false,
				msg: 'No existe un usuario con ese ID',
			});
		}

		const { password, google, email, ...campos } = req.body;
		if (usuarioDB.email !== email) {
			const existeUsuario = await Usuario.findOne({ email });
			if (existeUsuario) {
				return res.status(400).json({
					ok: false,
					msg: 'El correo ya esta registrado',
				});
			}
		}

		campos.email = email;

		const usuarioActualizado = await Usuario.findOneAndUpdate(uid, campos, { new: true });

		res.status(200).json({
			ok: true,
			usuario: usuarioActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado... revisar logs',
		});
	}
};

const eliminarUsuario = async (req, res = response) => {
	try {
		const uid = req.params.id;
		const usuarioDB = await Usuario.findById(uid);
		if (!usuarioDB) {
			return res.status(400).json({
				ok: false,
				msg: 'No existe un usuario con ese ID',
			});
		}

		await Usuario.findOneAndDelete(uid);

		res.status(200).json({
			ok: true,
			msg: 'Usuario eliminado',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado... revisar logs',
		});
	}
};

module.exports = {
	getUsuarios,
	crearUsuarios,
	actualizarUsuario,
	eliminarUsuario,
};
