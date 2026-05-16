import { pgTable, uuid, text, numeric, integer, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const food = pgTable(
	'food',
	{
		id: uuid('id')
			.default(sql`uuid_generate_v7()`)
			.primaryKey(),
		name: text('name').notNull(),
		carbs: numeric('carbs', { precision: 6, scale: 2 }),
		protein: numeric('protein', { precision: 6, scale: 2 }),
		fat: numeric('fat', { precision: 6, scale: 2 }),
		grams: numeric('grams', { precision: 7, scale: 2 }),
		calories: integer()
	},
	(t) => [index('food_name_idx').on(t.name)]
);
