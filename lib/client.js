const http = require('http');
const history = require('./history');

function main (idx) {
	let url = 'http://127.0.0.1:8080';
	
	if (idx !== undefined) {
		url += `/${idx}`;
	}
	
	http.get(url, (res) => {
		const { statusCode } = res;
		
		if (statusCode !== 200) {
			console.error(`Error ${statusCode}`);
			process.exit();
		}

		res.setEncoding('utf8');
		let rawData = '';
		res.on('data', (chunk) => { rawData += chunk; });
		res.on('end', () => {
			try {
				const parsedData = JSON.parse(rawData);
				console.log(parsedData);
			} catch (e) {
				console.error(e.message);
			}
		});
	}).on('error', (e) => {
		console.error(`Got error: ${e.message}`);
	});
}

module.exports = main;