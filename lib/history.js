const db = require('./files/history-cache');
const config = require('./config');

let HISTORY = [];
let maxlen = 32;

// Load clipboard history from file:
db.get()
	.then((data) => (HISTORY = data))
	.catch((err) => console.error(err));

// Load config:
config.init().then(() => {
	maxlen = config.max_history;
});

const history = {
	getLatest: () => HISTORY[0],
	push: (txt) => {
		HISTORY.unshift(txt);
		if (HISTORY.length > maxlen) {
			HISTORY = HISTORY.slice(maxlen);
		}
		db.save(HISTORY).catch((err) => console.error(err));
	},
	all: () => HISTORY,
	get: (i) => HISTORY[i],
};

module.exports = history;
