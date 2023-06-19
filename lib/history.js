const db = require('./files/cache');

let HISTORY = [];
let MAXLEN = 32;

// Load clipboard history from file:
db.get()
	.then((data) => (HISTORY = data))
	.catch((err) => console.error(err));

const history = {
	getLatest: () => HISTORY[0],
	push: (txt) => {
		HISTORY.unshift(txt);
		if (HISTORY.length > MAXLEN) {
			HISTORY = HISTORY.slice(MAXLEN);
		}
		db.save(HISTORY).catch((err) => console.error(err));
	},
	all: () => HISTORY,
	get: (i) => HISTORY[i],
};

module.exports = history;
