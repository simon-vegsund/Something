import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';
import { user } from '../user';

export const photo = pgTable(
	'photo',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		user_id: uuid('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		title: text('title').notNull(),
		url: text('url').notNull(),
		uploaded_at: timestamp('uploaded_at').defaultNow().notNull(),
		created_at: timestamp('created_at').defaultNow().notNull(),
		updated_at: timestamp('updated_at')
			.defaultNow()
			.notNull()
			.$onUpdate(() => new Date())
	},
	(t) => [index('photo_user_id_idx').on(t.user_id)]
);
