import { BMI } from './BMI';

let bmi = new BMI(__dirname + '/data.json');

console.log('Calculating BMI metric...');
bmi.calculateMetrics()
	.then(() => {
		const overWeightStatistics: string = bmi.getOverWeightStatistics();

		console.log('PROBLEM1');
		console.log(
			'BMI metrics created and stored in /dist/result.json file.'
		);

		console.log('-----------------------------');

		console.log('PROBLEM2');
		console.log(overWeightStatistics);
	})
	.catch(e => {
		console.log('Error while parsing data.json');
	});
