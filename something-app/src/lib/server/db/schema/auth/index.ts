import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';
import { user } from '../user';

export const session = pgTable(
	'session',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		user_id: uuid('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		token: text('token').notNull().unique(),
		expires_at: timestamp('expires_at').notNull(),
		ip_address: text('ip_address'),
		user_agent: text('user_agent'),
		created_at: timestamp('created_at').defaultNow().notNull(),
		updated_at: timestamp('updated_at')
			.defaultNow()
			.notNull()
			.$onUpdate(() => new Date())
	},
	(t) => [index('session_user_id_idx').on(t.user_id)]
);

export const account = pgTable(
	'account',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		user_id: uuid('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		account_id: text('account_id').notNull(),
		provider_id: text('provider_id').notNull(),
		access_token: text('access_token'),
		refresh_token: text('refresh_token'),
		access_token_expires_at: timestamp('access_token_expires_at'),
		refresh_token_expires_at: timestamp('refresh_token_expires_at'),
		scope: text('scope'),
		id_token: text('id_token'),
		password: text('password'),
		created_at: timestamp('created_at').defaultNow().notNull(),
		updated_at: timestamp('updated_at')
			.defaultNow()
			.notNull()
			.$onUpdate(() => new Date())
	},
	(t) => [index('account_user_id_idx').on(t.user_id)]
);

export const verification = pgTable(
	'verification',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
		expires_at: timestamp('expires_at').notNull(),
		created_at: timestamp('created_at').defaultNow().notNull(),
		updated_at: timestamp('updated_at')
			.defaultNow()
			.notNull()
			.$onUpdate(() => new Date())
	},
	(t) => [index('verification_identifier_idx').on(t.identifier)]
);
