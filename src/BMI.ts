import fs from 'fs';

// stream-json package used to stream json objects from json file.
import { parser } from 'stream-json';
import { chain } from 'stream-chain';
import { streamArray } from 'stream-json/streamers/StreamArray';
import { disassembler } from 'stream-json/Disassembler';

import { calculateBMI } from './utils/calculateBMI';
import { stringer } from 'stream-json/Stringer';
import { BMICategory } from './types/BMICategory';
import { HealthRisk } from './types/HealthRisk';
import { Token } from './types/Token';
import { Person } from './types/Person';
import { GenderStatistics } from './types/GenderStatistics';
import { calculateHealthStatus } from './utils/calculateHealthStatus';

export class BMI {
	dataFilePath: string;
	size: GenderStatistics;
	numberOfOverWeight: GenderStatistics;

	constructor(dataFilePath: string) {
		this.dataFilePath = dataFilePath;
		this.size = {
			Total: 0,
			Male: 0,
			Female: 0,
			Other: 0,
		};
		this.numberOfOverWeight = {
			Total: 0,
			Male: 0,
			Female: 0,
			Other: 0,
		};
	}

	/*
	 *	calculateMetrics()
	 *		- update total number of people
	 *		- update total number of over-weight people
	 *		- add 3 new columns to json object and save it to result.json file
	 */
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

					const healthStatus: [BMICategory, HealthRisk] =
						calculateHealthStatus(bmi);

					this.size[value['Gender']]++;
					this.size['Total']++;

					if (healthStatus[0] === 'Over Weight') {
						this.numberOfOverWeight[value['Gender']]++;
						this.numberOfOverWeight['Total']++;
					}

					return {
						...value,
						BMI: bmi,
						BMICategory: healthStatus[0],
						HealthRisk: healthStatus[1],
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

	/*
	 *	getOverWeightStatistics()
	 *		- Getter method for Over Weight Statistics
	 */
	public getOverWeightStatistics(): string {
		let percentPeopleOverweight: string = (
			(this.numberOfOverWeight['Total'] / this.size['Total']) *
			100
		).toFixed(2);

		let maleOverWeightPercent: string = (
			(this.numberOfOverWeight['Male'] /
				this.numberOfOverWeight['Total']) *
			100
		).toFixed(2);
		let femaleOverWeightPercent: string = (
			(this.numberOfOverWeight['Female'] /
				this.numberOfOverWeight['Total']) *
			100
		).toFixed(2);
		let otherOverWeightPercent: string = (
			(this.numberOfOverWeight['Other'] /
				this.numberOfOverWeight['Total']) *
			100
		).toFixed(2);

		let statistics: string = '';

		statistics += `Total number of overweight people - ${this.numberOfOverWeight['Total']}\n`;
		statistics += `Observation--\n`;
		statistics += `It is found that ${percentPeopleOverweight}% of total sample set are overweight.\n`;

		if (this.numberOfOverWeight['Total'] > 0) {
			statistics += `Out of total overweight people:\n`;
			statistics += `${maleOverWeightPercent}% are Male.\n`;
			statistics += `${femaleOverWeightPercent}% are Female\n`;
			statistics += `${otherOverWeightPercent}% are Other\n`;
		}

		return statistics;
	}
}
