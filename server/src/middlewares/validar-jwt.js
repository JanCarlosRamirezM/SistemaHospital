const jwt = require('jsonwebtoken');
const { response } = require('express');

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

module.exports = {
	validarJWT,
};
