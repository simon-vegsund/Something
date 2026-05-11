import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '$env/static/private';

const connectionString: string = DATABASE_URL as string;
const sql = neon(connectionString);

export async function load() {
	const response = await sql`SELECT version()`;
	const { version } = response[0];
	return {
		version
	};
}
