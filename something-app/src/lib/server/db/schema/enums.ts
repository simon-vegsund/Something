import { pgEnum } from 'drizzle-orm/pg-core';

export const dayEnum = pgEnum('day', [
	'Push',
	'Pull',
	'Legs',
	'Arms',
	'Back',
	'Chest',
	'Shoulders',
	'Biceps'
]);

export const categoryEnum = pgEnum('workout_category', [
	'Strength',
	'Cardio',
	'Flexibility',
	'Other'
]);

export const cardioEnum = pgEnum('cardio_type', [
	'Walking',
	'Running',
	'Cycling',
	'Elliptical',
	'Swimming',
	'Interval',
	'HIIT',
	'Other'
]);

export const mealEnum = pgEnum('meal_type', [
	'Breakfast',
	'Lunch',
	'Brunch',
	'Snack',
	'Dinner',
	'Evening meal',
	'Other'
]);

export const goalEnum = pgEnum('goal_type', ['short-term', 'long-term']);

export const heightUnitEnum = pgEnum('height_unit', ['cm', 'ft']);

export const microEnum = pgEnum('micro', [
	'Vitamin D',
	'Magnesium',
	'Iron',
	'Calcium',
	'Creatine',
	'Zinc',
	'B Vitamins',
	'Vitamin b12',
	'Potassium',
	'Sodium',
	'Omgea-3',
	'B9'
]);
