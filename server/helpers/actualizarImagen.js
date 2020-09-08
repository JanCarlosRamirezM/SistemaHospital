const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');
const fs = require('fs');

const actualizarImagen = async (id, tipo, nombreArchivo) => {
	let pathViejo;
	switch (tipo) {
		case 'hospitales':
			const hospital = await Hospital.findById(id);
			if (!hospital) {
				console.log('No existe un hospital con el ID: ', id);
				return false;
			}
			pathViejo = __dirname + `./../uploads/${tipo}/${hospital.img}`;
			borrarImagen(pathViejo);

			hospital.img = nombreArchivo;
			await hospital.save();
			return true;

		case 'medicos':
			const medico = await Medico.findById(id);
			if (!medico) {
				console.log('No existe un medico con el ID: ', id);
				return false;
			}

			pathViejo = __dirname + `./../uploads/${tipo}/${medico.img}`;
			borrarImagen(pathViejo);

			medico.img = nombreArchivo;
			await medico.save();
			return true;

		case 'usuarios':
			const usuario = await Usuario.findById(id);
			if (!usuario) {
				console.log('No existe un usuario con el ID: ', id);
				return false;
			}

			pathViejo = __dirname + `./../uploads/${tipo}/${usuario.img}`;
			borrarImagen(pathViejo);

			usuario.img = nombreArchivo;
			await usuario.save();
			return true;

		default:
			return false;
	}
};

const borrarImagen = (path) => {
	if (fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
};

module.exports = {
	actualizarImagen,
};
