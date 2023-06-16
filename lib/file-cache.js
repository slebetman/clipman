const path = require('path');
const fs = require('fs/promises');
const { mkdirp } = require('mkdirp');
const xdg = require('xdg-portable/cjs');

const cacheDir = path.join(xdg.data(), 'com.slebetman.clipman');
const cacheFile = path.join(cacheDir, 'history.json');

mkdirp.sync(cacheDir);

async function get() {
	try {
		const raw = await fs.readFile(cacheFile);
		const obj = JSON.parse(raw.toString('utf8'));
		return obj.history;
	} catch (err) {
		return [];
	}
}

async function save(history) {
	const json = JSON.stringify({ history }, null, 2);
	await fs.writeFile(cacheFile, json);
}

module.exports = {
	get,
	save,
};
