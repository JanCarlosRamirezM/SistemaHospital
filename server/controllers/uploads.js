const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizarImagen');
const path = require('path');
const fs = require('fs');

const fileUpload = (req, res) => {
	const { tipo, id } = req.params;

	const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

	if (!tiposValidos.includes(tipo)) {
		return res.status(400).json({
			ok: false,
			msg: 'El tipo tiene que ser usuarios | hospitales| medicos',
		});
	}

	// Validar que exista un archivo
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({
			ok: false,
			msg: 'No hay archivo',
		});
	}

	// Procesar imagen
	const file = req.files.imagen;
	const nombreCortado = file.name.split('.');
	const extensionArchivo = nombreCortado[nombreCortado.length - 1];
	const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

	if (!extencionesValidas.includes(extensionArchivo)) {
		return res.status(400).json({
			ok: false,
			msg: 'La extención no es permitida. Permitidas (png | jpg | jpeg | gif) ',
		});
	}

	// Generar el nombre del archivo
	const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

	// Path para guardar la imagen
	const path = __dirname + `./../uploads/${tipo}/${nombreArchivo}`;

	//  Mover la imagen
	file.mv(path, function (err) {
		if (err) {
			console.log(err);
			return res.status(400).json({
				ok: false,
				msg: 'Error al mover la imagen. Ver log...',
			});
		}

		actualizarImagen(id, tipo, nombreArchivo);

		res.status(200).json({
			ok: true,
			msg: 'Archivo subido',
			img: nombreArchivo,
		});
	});
};

const retornarImagen = (req, res) => {
	const { tipo, foto } = req.params;
	const pathImg = path.join(__dirname, `./../uploads/${tipo}/${foto}`);

	if (fs.existsSync(pathImg)) {
		res.sendFile(pathImg);
	} else {
		const pathImg = path.join(__dirname, `./../uploads/no-img.jpg`);
		res.sendFile(pathImg);
	}
};

module.exports = {
	fileUpload,
	retornarImagen,
};
