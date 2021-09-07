export const calculateBMI = (height: number, weight: number): number => {
	return parseFloat(((weight * 100) / height).toFixed(2));
};
