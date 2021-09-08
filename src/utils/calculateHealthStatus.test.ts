import { BMICategory } from '../types/BMICategory';
import { HealthRisk } from '../types/HealthRisk';
import { calculateHealthStatus } from './calculateHealthStatus';

describe('Health Status', () => {
	test('BMI Category should be "Under Weight" and Health Risk should be  "Malnutrition risk" if bmi if less than equal to 18.4', () => {
		const bmi: number = 17;
		const healthStatus: [BMICategory, HealthRisk] =
			calculateHealthStatus(bmi);

		expect(healthStatus).toEqual(['Under Weight', 'Malnutrition risk']);
	});

	test('BMI Category should be "Normal Weight" and Health Risk should be  "Low risk" if bmi is between 18.5 and 24.9', () => {
		const bmi: number = 20;
		const healthStatus: [BMICategory, HealthRisk] =
			calculateHealthStatus(bmi);

		expect(healthStatus).toEqual(['Normal Weight', 'Low risk']);
	});

	test('BMI Category should be "Over Weight" and Health Risk should be  "Enhanced risk" if bmi is between 25 and 29.9', () => {
		const bmi: number = 27;
		const healthStatus: [BMICategory, HealthRisk] =
			calculateHealthStatus(bmi);

		expect(healthStatus).toEqual(['Over Weight', 'Enhanced risk']);
	});

	test('BMI Category should be "Moderately Obese" and Health Risk should be  "Medium risk" if bmi is between 30 and 34.9', () => {
		const bmi: number = 31;
		const healthStatus: [BMICategory, HealthRisk] =
			calculateHealthStatus(bmi);

		expect(healthStatus).toEqual(['Moderately Obese', 'Medium risk']);
	});

	test('BMI Category should be "Severely Obese" and Health Risk should be  "High risk" if bmi is between 35 and 39.9', () => {
		const bmi: number = 39;
		const healthStatus: [BMICategory, HealthRisk] =
			calculateHealthStatus(bmi);

		expect(healthStatus).toEqual(['Severely Obese', 'High risk']);
	});

	test('BMI Category should be "Very Severely Obese" and Health Risk should be  "Very high risk" if bmi is greather than 40', () => {
		const bmi: number = 44;
		const healthStatus: [BMICategory, HealthRisk] =
			calculateHealthStatus(bmi);

		expect(healthStatus).toEqual(['Very Severely Obese', 'Very high risk']);
	});
});
