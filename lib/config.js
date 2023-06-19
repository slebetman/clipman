const db = require('./files/config-file');

let config = {
	...db.DEFAULTS,
	init: async () => {
		const fromFile = await db.get();
		config = {
			...config,
			...fromFile,
		};
	},
};

module.exports = config;
