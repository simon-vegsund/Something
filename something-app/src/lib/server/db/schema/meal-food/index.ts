import { pgTable, uuid, numeric, primaryKey, index } from 'drizzle-orm/pg-core';
import { meal } from '../meal';
import { food } from '../food';

export const mealFood = pgTable(
	'meal_food',
	{
		meal_id: uuid('meal_id')
			.notNull()
			.references(() => meal.id, { onDelete: 'cascade' }),
		food_id: uuid('food_id')
			.notNull()
			.references(() => food.id),
		grams: numeric('grams', { precision: 7, scale: 2 }).notNull()
	},
	(t) => [
		primaryKey({ columns: [t.meal_id, t.food_id] }),
		index('meal_food_food_id_idx').on(t.food_id)
	]
);
