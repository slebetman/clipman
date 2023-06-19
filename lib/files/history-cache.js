const Loader = require('./loader');

const db = new Loader('data', 'history.json');

async function get() {
	const obj = await db.get();
	let history = [];
	if (obj) {
		history = obj.history;
	}
	return history;
}

async function save(history) {
	await db.save({ history });
}

module.exports = {
	get,
	save,
};
