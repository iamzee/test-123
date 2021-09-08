import { Person } from './Person';

// Token interface - used in stream pipeline
export interface Token {
	key: number;
	value: Person;
}
