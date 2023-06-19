const path = require('path');
const fs = require('fs/promises');
const { mkdirp } = require('mkdirp');
const xdg = require('xdg-portable/cjs');

class Loader {
	constructor(type, fileName) {
		let basePath = '';
		switch (type) {
			case 'data':
				basePath = xdg.data();
				break;
			case 'config':
				basePath = xdg.config();
				break;
			default:
				throw new Error('Invalid type');
		}

		const dir = path.join(basePath, 'com.slebetman.clipman');
		this.file = path.join(dir, fileName);

		mkdirp(dir);
	}

	async get() {
		try {
			const raw = await fs.readFile(this.file);
			return JSON.parse(raw.toString('utf8'));
		} catch (err) {
			return null;
		}
	}

	async save(data) {
		const json = JSON.stringify(data, null, 2);
		await fs.writeFile(this.file, json);
	}
}

module.exports = Loader;
