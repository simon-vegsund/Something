import { pgTable, uuid, text, smallint, index } from 'drizzle-orm/pg-core';
import { workout } from '../workout';

export const exercise = pgTable(
	'exercise',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		workout_id: uuid('workout_id')
			.notNull()
			.references(() => workout.id, { onDelete: 'cascade' }),
		name: text('name').notNull(),
		sets: smallint()
	},
	(t) => [index('exercise_workout_id_idx').on(t.workout_id)]
);
