import * as SQLite from 'expo-sqlite';

const SCHEMA_VERSION = 1;

const MIGRATION_V1 = `
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    mode TEXT NOT NULL CHECK(mode IN ('diy','pro')),
    description TEXT DEFAULT '',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS pieces (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    width REAL NOT NULL,
    height REAL NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    thickness REAL NOT NULL DEFAULT 18
  );

  CREATE TABLE IF NOT EXISTS materials (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    quantity REAL NOT NULL,
    unit TEXT DEFAULT 'ud'
  );

  CREATE TABLE IF NOT EXISTS optimizations (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    board_width REAL NOT NULL,
    board_height REAL NOT NULL,
    total_boards INTEGER NOT NULL,
    waste_percentage REAL NOT NULL,
    efficiency REAL NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS shop_options (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    store_name TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('online','physical')),
    price REAL NOT NULL,
    delivery_time TEXT NOT NULL,
    score REAL NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_pieces_project ON pieces(project_id);
  CREATE INDEX IF NOT EXISTS idx_materials_project ON materials(project_id);
  CREATE INDEX IF NOT EXISTS idx_optimizations_project ON optimizations(project_id);
  CREATE INDEX IF NOT EXISTS idx_shop_options_project ON shop_options(project_id);
`;

export async function runMigrations(db: SQLite.SQLiteDatabase): Promise<void> {
  // Check current version
  const result = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  const currentVersion = result?.user_version ?? 0;

  if (currentVersion < 1) {
    await db.execAsync(MIGRATION_V1);
    await db.execAsync(`PRAGMA user_version = ${SCHEMA_VERSION}`);
  }

  // Future migrations go here:
  // if (currentVersion < 2) { ... await db.execAsync(`PRAGMA user_version = 2`); }
}
