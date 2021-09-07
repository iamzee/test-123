const fs = require('fs');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const { chain } = require('stream-chain');
const { stringer } = require('stream-json/Stringer');
const { disassembler } = require('stream-json/Disassembler');

try {
	const pipeline = chain([
		fs.createReadStream(__dirname + '/data.json', {
			// encoding: 'utf-8',
		}),
		parser(),
		streamArray(),
		data => {
			const value = data.value;
			return {
				Gender: value['Gender'],
				HeightCm: value['HeightCm'],
				WeightKg: value['WeightKg'],
				BMI: Math.round((value['WeightKg'] * 100) / value['HeightCm']),
			};
		},
		disassembler(),
		stringer({ makeArray: true }),
		fs.createWriteStream(__dirname + '/result.json'),
	]);
	pipeline.on('data', chunk => {
		console.log(chunk);
	});
} catch (e) {
	console.log(e);
}
