const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');
const getTodo = async (req, res) => {
	const { busqueda } = req.params;
	const regex = RegExp(busqueda, 'i');

	const [usuarios, hospitales, medicos] = await Promise.all([
		Usuario.find({ nombre: regex }),
		Hospital.find({ nombre: regex }),
		Medico.find({ nombre: regex }),
	]);

	res.status(200).json({
		ok: true,
		usuarios,
		hospitales,
		medicos,
	});
};

const getDocumentoColeccion = async (req, res) => {
	const { tabla, busqueda } = req.params;
	const regex = RegExp(busqueda, 'i');
	let resultado = [];

	switch (tabla) {
		case 'usuarios':
			resultado = await Usuario.find({ nombre: regex });
			break;

		case 'hospitales':
			resultado = await Hospital.find({ nombre: regex }).populate('usuario', 'nombre email role img');
			break;

		case 'medicos':
			resultado = await Medico.find({ nombre: regex })
				.populate('hospital', 'nombre img')
				.populate('usuario', 'nombre email role img');
			break;

		default:
			return res.status(400).json({
				ok: false,
				msg: 'La tabla tiene que ser usuarios | hospitales| medicos',
			});
	}
	res.status(200).json({
		ok: true,
		tabla,
		resultado,
	});
};

module.exports = { getTodo, getDocumentoColeccion };
