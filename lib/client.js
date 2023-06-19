const http = require('http');
const config = require('./config');

async function main(idx) {
	await config.init();
	let url = `http://127.0.0.1:${config.port}`;

	if (idx !== undefined) {
		switch (idx) {
			default:
				url += `/${idx}`;
		}
	}

	http.get(url, (res) => {
		const { statusCode } = res;

		if (statusCode !== 200) {
			console.error(`Error ${statusCode}`);
			process.exit();
		}

		res.setEncoding('utf8');
		let rawData = '';
		res.on('data', (chunk) => {
			rawData += chunk;
		});
		res.on('end', () => {
			try {
				const parsedData = JSON.parse(rawData);
				if (parsedData.history) {
					let i = 0;
					console.log(
						parsedData.history
							.map((x) => {
								let txt = `[${i}]: ${x}`;
								if (txt.length > 80) {
									txt = txt.slice(0, 77) + ' ..';
								}
								i++;
								return txt;
							})
							.join('\n')
					);
				} else {
					console.error(parsedData);
				}
			} catch (e) {
				console.error(e.message);
			}
		});
	}).on('error', (e) => {
		console.error(`Got error: ${e.message}`);
	});
}

module.exports = main;
