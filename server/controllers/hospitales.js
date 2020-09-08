const Hospital = require('../models/hospital');

const getHospital = async (req, res) => {
	const hospitales = await Hospital.find().populate('usuario', 'nombre img');
	res.status(200).json({
		ok: true,
		hospitales,
	});
};

const crearHospital = async (req, res) => {
	try {
		const { uid } = req;

		const hospital = new Hospital({ usuario: uid, ...req.body });
		await hospital.save();
		res.status(200).json({
			ok: true,
			hospital,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado... revisar logs',
		});
	}
};

const actualizarHospital = async (req, res = response) => {
	try {
		const uid = req.params.id;
		const { id } = req.params;

		const hospital = await Hospital.findById(id);

		if (!hospital) {
			return res.status(400).json({
				ok: false,
				msg: 'No existe un hospital con ese ID',
			});
		}

		const cambiosHospital = {
			...req.body,
			usuario: uid,
		};

		const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

		res.status(200).json({
			ok: true,
			hospital: hospitalActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado... revisar logs',
		});
	}
};

const eliminarHospital = async (req, res) => {
	const { id } = req.params;

	try {
		const hospital = await Hospital.findById(id);

		if (!hospital) {
			return res.status(400).json({
				ok: false,
				msg: 'No existe un hospital con ese ID',
			});
		}

		await Hospital.findByIdAndDelete(id);

		res.status(200).json({
			ok: true,
			msg: 'Hospital eliminado',
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
	getHospital,
	crearHospital,
	actualizarHospital,
	eliminarHospital,
};
