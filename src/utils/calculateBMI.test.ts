import { calculateBMI } from './calculateBMI';

test('should calculate BMI', () => {
	const bmi = calculateBMI(175, 75);
	expect(bmi).toEqual(42.86);
});
