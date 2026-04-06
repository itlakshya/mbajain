import { Pool } from 'pg';

/**
 * Transient disconnects (e.g. serverless Postgres idle timeout, SSL blip) show as
 * "Connection terminated unexpectedly". Tune pool and use a pooled DATABASE_URL when available.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.PG_POOL_MAX || 10),
  idleTimeoutMillis: Number(process.env.PG_IDLE_MS || 20_000),
  connectionTimeoutMillis: Number(process.env.PG_CONN_TIMEOUT_MS || 15_000),
  keepAlive: true,
});

export default pool;
