import { getDatabase } from './database';
import { StoreOption, ShopOptionRow } from '../models';
import { generateId } from './utils';

function rowToStoreOption(row: ShopOptionRow): StoreOption {
  return {
    id: row.id,
    projectId: row.project_id,
    name: row.store_name,
    type: row.type as 'online' | 'physical',
    price: row.price,
    time: row.delivery_time,
    score: row.score,
  };
}

export async function saveShopOptions(projectId: string, options: StoreOption[]): Promise<void> {
  const db = await getDatabase();

  // Clear previous options for this project
  await db.runAsync('DELETE FROM shop_options WHERE project_id = ?', projectId);

  for (const opt of options) {
    const id = generateId();
    await db.runAsync(
      'INSERT INTO shop_options (id, project_id, store_name, type, price, delivery_time, score) VALUES (?, ?, ?, ?, ?, ?, ?)',
      id, projectId, opt.name, opt.type, opt.price, opt.time, opt.score
    );
  }
}

export async function getShopOptionsByProject(projectId: string): Promise<StoreOption[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<ShopOptionRow>(
    'SELECT * FROM shop_options WHERE project_id = ?',
    projectId
  );
  return rows.map(rowToStoreOption);
}
