const jwt = require('jsonwebtoken');
 
const generarJWT = (uid) => {
	return new Promise((resolve, reject) => {
		const payload = {
			uid,
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRES,
			},
			(error, token) => {
				if (error) {
					reject('No se pudo generar el JWT');
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = {
	generarJWT,
};
