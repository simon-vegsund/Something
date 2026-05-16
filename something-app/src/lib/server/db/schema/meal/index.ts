import { pgTable, uuid, integer, timestamp, index } from 'drizzle-orm/pg-core';
import { mealEnum, microEnum } from '../enums';
import { user } from '../user';

export const meal = pgTable(
	'meal',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		user_id: uuid('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		logged_at: timestamp('logged_at').defaultNow().notNull(),
		mealtype: mealEnum().notNull(),
		calories: integer(),
		dietary_supplements: microEnum(),
		created_at: timestamp('created_at').defaultNow().notNull(),
		updated_at: timestamp('updated_at')
			.defaultNow()
			.notNull()
			.$onUpdate(() => new Date())
	},
	(t) => [
		index('meal_user_id_idx').on(t.user_id),
		index('meal_user_logged_idx').on(t.user_id, t.logged_at)
	]
);
