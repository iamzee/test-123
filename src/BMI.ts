import * as fs from 'fs';
import { parser } from 'stream-json';
import { chain } from 'stream-chain';
import { streamArray } from 'stream-json/streamers/StreamArray';
import { disassembler } from 'stream-json/Disassembler';

import { calculateBMI } from './utils/calculateBMI';
import { calculateBMICategory } from './utils/calculateBMICategory';
import { calculateHealthRisk } from './utils/calculateHealthRisk';
import { stringer } from 'stream-json/Stringer';
import { BMICategory } from './types/BMICategory';
import { HealthRisk } from './types/HealthRisk';
import { Token } from './types/Token';
import { Person } from './types/Person';
import { GenderStatistics } from './types/GenderStatistics';

class BMI {
	dataFilePath: string;
	size: GenderStatistics;
	numberOfOverWeight: GenderStatistics;

	constructor(dataFilePath: string) {
		this.dataFilePath = dataFilePath;
		this.size = {
			Male: 0,
			Female: 0,
			Other: 0,
		};
		this.numberOfOverWeight = {
			Male: 0,
			Female: 0,
			Other: 0,
		};
	}

	public calculateMetrics(): Promise<void> {
		return new Promise((resolve, reject) => {
			const pipeline = chain([
				fs.createReadStream(this.dataFilePath, { encoding: 'utf-8' }),
				parser(),
				streamArray(),
				(data: Token): Person => {
					const value: Person = data.value;

					const bmi: number = calculateBMI(
						value['HeightCm'],
						value['WeightKg']
					);
					const bmiCategory: BMICategory = calculateBMICategory(bmi);
					const healthRisk: HealthRisk = calculateHealthRisk(bmi);

					this.size[value['Gender']]++;

					if (bmiCategory === 'Severely Obese') {
						this.numberOfOverWeight[value['Gender']]++;
					}

					return {
						...value,
						BMI: bmi,
						BMICategory: bmiCategory,
						HealthRisk: healthRisk,
					};
				},
				disassembler(),
				stringer({ makeArray: true }),
				fs.createWriteStream(__dirname + '/result.json'),
			]);

			pipeline.on('error', (): void => {
				reject();
			});

			pipeline.on('end', (): void => {
				resolve();
			});
		});
	}

	public getOverWeightStatistics(): void {
		console.log(this.size);
		console.log(this.numberOfOverWeight);
	}
}

let bmi = new BMI(__dirname + '/data.json');
bmi.calculateMetrics().then(() => {
	bmi.getOverWeightStatistics();
});
