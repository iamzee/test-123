import { BMICategory } from '../types/BMICategory';
import { HealthRisk } from '../types/HealthRisk';

/*
 *	BMI Category and Health Risk -
 *	both are calculated using the same function
 *	as their values lie under the same BMI range
 */

export const calculateHealthStatus = (
	bmi: number
): [BMICategory, HealthRisk] => {
	if (bmi <= 18.4) {
		return ['Under Weight', 'Malnutrition risk'];
	} else if (bmi >= 18.5 && bmi <= 24.9) {
		return ['Normal Weight', 'Low risk'];
	} else if (bmi >= 25 && bmi <= 29.9) {
		return ['Over Weight', 'Enhanced risk'];
	} else if (bmi >= 30 && bmi <= 34.9) {
		return ['Moderately Obese', 'Medium risk'];
	} else if (bmi >= 35 && bmi <= 39.9) {
		return ['Severely Obese', 'High risk'];
	} else {
		return ['Very Severely Obese', 'Very high risk'];
	}
};
