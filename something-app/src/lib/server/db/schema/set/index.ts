import { pgTable, uuid, smallint, integer, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { exercise } from '../exercise';

export const set = pgTable(
	'set',
	{
		id: uuid('id')
			.default(sql`uuid_generate_v7()`)
			.primaryKey(),
		exercise_id: uuid('exercise_id')
			.notNull()
			.references(() => exercise.id, { onDelete: 'cascade' }),
		reps: smallint('reps'),
		duration: integer('duration')
	},
	(t) => [index('set_exercise_id_idx').on(t.exercise_id)]
);
