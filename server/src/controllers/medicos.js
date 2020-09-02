const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getMedicos = async (req, res) => {
	const medicos = await Medico.find({}).populate('hospital', 'nombre img').populate('usuario', 'nombre img');

	res.status(200).json({
		ok: true,
		medicos,
	});
};

const crearMedicos = async (req, res) => {
	try {
		const { uid } = req;
		const _id = req.body.hospital;

		const hospitalExiste = await Hospital.findById(_id);
		if (!hospitalExiste) {
			return res.status(400).json({
				ok: false,
				msg: 'El hospital no existe',
			});
		}

		const medico = new Medico({ usuario: uid, ...req.body });

		await medico.save();

		res.status(200).json({
			ok: true,
			medico,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado... revisar logs',
		});
	}
};

const actualizarMedicos = async (req, res) => {
	try {
		const uid = req.params.id;
		const { id } = req.params;

		const medico = await Medico.findById(id);

		if (!medico) {
			return res.status(400).json({
				ok: false,
				msg: 'No existe un medico con ese ID',
			});
		}

		const cambiosMedico = {
			...req.body,
			usuario: uid,
		};

		const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

		res.status(200).json({
			ok: true,
			medico: medicoActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado... revisar logs',
		});
	}
};

const eliminarMedicos = async (req, res) => {
	const { id } = req.params;

	try {
		const medico = await Medico.findById(id);

		if (!medico) {
			return res.status(400).json({
				ok: false,
				msg: 'No existe un medico con ese ID',
			});
		}

		await Medico.findByIdAndDelete(id);

		res.status(200).json({
			ok: true,
			msg: 'Medico eliminado',
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
	getMedicos,
	crearMedicos,
	actualizarMedicos,
	eliminarMedicos,
};
