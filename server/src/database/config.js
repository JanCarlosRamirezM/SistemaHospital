require('dotenv').config({ path: __dirname + '../../../.env' });

const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});

		console.log('DB ONLINE!');
	} catch (error) {
		console.log('DATABASE ERROR!', error);
	}
};

module.exports = {
	dbConnection,
};
