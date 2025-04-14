import { drizzle } from 'drizzle-orm/neon-http';
import {neon} from 'drizzle-orm/neon-http';
import * as schema from './schema';
const sql = process.env.NEXT_PUBLIC_DRIZZLE_DB_URL;
export const db = drizzle(sql, {schema});

