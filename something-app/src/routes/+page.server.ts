import { sql } from 'drizzle-orm';
import { db } from '$lib/server/db';

export async function load() {
	const [{ version }] = await db.execute<{ version: string }>(sql`SELECT version()`);
	return {
		version
	};
}
