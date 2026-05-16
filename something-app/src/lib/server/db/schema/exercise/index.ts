import { pgTable, uuid, text, smallint, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { workout } from '../workout';

export const exercise = pgTable(
	'exercise',
	{
		id: uuid('id')
			.default(sql`uuid_generate_v7()`)
			.primaryKey(),
		workout_id: uuid('workout_id')
			.notNull()
			.references(() => workout.id, { onDelete: 'cascade' }),
		name: text('name').notNull(),
		sets: smallint()
	},
	(t) => [index('exercise_workout_id_idx').on(t.workout_id)]
);
