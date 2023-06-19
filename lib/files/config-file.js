const Loader = require('./loader');

const db = new Loader('config', 'config.json');

const DEFAULTS = {
	max_history: 32,
	port: 8123,
};

async function get() {
	const obj = await db.get();
	let config = DEFAULTS;
	if (obj) {
		config = obj;
	} else {
		await save(config);
	}
	return config;
}

async function save(config) {
	await db.save(config);
}

module.exports = {
	get,
	save,
	DEFAULTS,
};
