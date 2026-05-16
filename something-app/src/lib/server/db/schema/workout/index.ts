import { pgTable, uuid, varchar, integer, timestamp, index } from 'drizzle-orm/pg-core';
import { dayEnum, categoryEnum, cardioEnum } from '../enums';
import { user } from '../user';

export const workout = pgTable(
	'workout',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		user_id: uuid('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		title: varchar({ length: 30 }).notNull(),
		day: dayEnum(),
		category: categoryEnum(),
		cardio_type: cardioEnum(),
		duration: integer('duration'),
		created_at: timestamp('created_at').defaultNow().notNull(),
		updated_at: timestamp('updated_at')
			.defaultNow()
			.notNull()
			.$onUpdate(() => new Date())
	},
	(t) => [
		index('workout_user_id_idx').on(t.user_id),
		index('workout_user_created_idx').on(t.user_id, t.created_at)
	]
);
