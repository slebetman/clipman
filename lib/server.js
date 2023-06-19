const http = require('http');
const history = require('./history');
const config = require('./config');

function monitorChange(clipboard) {
	return function () {
		let latest = history.getLatest();
		let selection = clipboard.readSync();

		if (latest !== '' && latest !== selection) {
			history.push(selection);
		}
	};
}

async function main(clipboard) {
	await config.init();
	setInterval(monitorChange(clipboard), 200);

	const server = http.createServer((req, res) => {
		const url = req.url;
		const cmd = url.replace(/^\//, '');

		if (cmd === '') {
			res.end(
				JSON.stringify({
					history: history.all(),
				}),
				'utf8'
			);
		} else {
			switch (cmd) {
				case 'exit':
				case 'kill':
					res.end(
						JSON.stringify({
							status: 'Server terminated..',
						})
					);
					res.on('close', () => process.exit());
					break;
				default:
					try {
						const idx = parseInt(cmd, 10);

						const clip = history.get(idx);
						clipboard.writeSync(clip);

						res.end(
							JSON.stringify({
								history: [clip],
							}),
							'utf8'
						);
					} catch (err) {
						res.end(
							JSON.stringify({
								error: err,
							}),
							'utf8'
						);
					}
			}
		}
	});

	server.listen(config.port, '127.0.0.1');
}

module.exports = main;
