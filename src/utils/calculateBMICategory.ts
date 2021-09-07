import { BMICategory } from '../types/BMICategory';

export const calculateBMICategory = (bmi: number): BMICategory => {
	if (bmi <= 18.4) {
		return 'Under Weight';
	} else if (bmi >= 18.5 && bmi <= 24.9) {
		return 'Normal Weight';
	} else if (bmi >= 25 && bmi <= 29.9) {
		return 'Over Weight';
	} else if (bmi >= 30 && bmi <= 34.9) {
		return 'Moderately Obese';
	} else if (bmi >= 35 && bmi <= 39.9) {
		return 'Severely Obese';
	} else {
		return 'Very Severely Obese';
	}
};
