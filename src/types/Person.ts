import { BMICategory } from './BMICategory';
import { HealthRisk } from './HealthRisk';

export interface Person {
	Gender: 'Male' | 'Female' | 'Other';
	HeightCm: number;
	WeightKg: number;
	BMI?: number;
	BMICategory?: BMICategory;
	HealthRisk?: HealthRisk;
}
