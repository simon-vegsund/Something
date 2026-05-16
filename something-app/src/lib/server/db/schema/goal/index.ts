import { pgTable, uuid, text, numeric, timestamp, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { goalEnum } from '../enums';
import { user } from '../user';

export const goal = pgTable(
	'goal',
	{
		id: uuid('id')
			.default(sql`uuid_generate_v7()`)
			.primaryKey(),
		user_id: uuid('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		description: text().notNull(),
		type: goalEnum(),
		weight: numeric('body_weight', { precision: 5, scale: 1 }),
		bodyfat: numeric('bodyfat_percentage', { precision: 4, scale: 2 }),
		created_at: timestamp('created_at').defaultNow().notNull(),
		updated_at: timestamp('updated_at')
			.defaultNow()
			.notNull()
			.$onUpdate(() => new Date())
	},
	(t) => [index('goal_user_id_idx').on(t.user_id)]
);
