import {
	pgTable,
	date,
	uuid,
	varchar,
	text,
	boolean,
	numeric,
	timestamp,
	index
} from 'drizzle-orm/pg-core';
import { heightUnitEnum } from '../enums';

export const user = pgTable(
	'user',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		// Better Auth managed fields
		name: varchar('name', { length: 256 }).notNull(),
		email: varchar({ length: 256 }).notNull().unique(),
		email_verified: boolean('email_verified').notNull().default(false),
		image: text('image'),
		// Profile fields
		first_name: varchar({ length: 256 }),
		last_name: varchar({ length: 256 }),
		date_of_birth: date('date_of_birth', { mode: 'date' }),
		weight: numeric('body_weight', { precision: 5, scale: 1 }),
		height: numeric('height', { precision: 5, scale: 2 }),
		height_unit: heightUnitEnum(),
		bodyfat: numeric('bodyfat_percentage', { precision: 4, scale: 2 }),
		created_at: timestamp('created_at').defaultNow().notNull(),
		updated_at: timestamp('updated_at')
			.defaultNow()
			.notNull()
			.$onUpdate(() => new Date())
	},
	(t) => [index('user_email_idx').on(t.email)]
);
