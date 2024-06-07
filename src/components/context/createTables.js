import { createTable } from "../Utility/CDatabase";

export async function createTables() {
    console.log('creating tables');
    await createTable('Folder', { path: 'VARCHAR PRIMARY KEY', syncedUpto: 'VARCHAR' }); // syncedUpto is mtime of last file from sorted files acc. mtime
    await createTable('Variables', { name: 'VARCHAR PRIMARY KEY', value: 'VARCHAR' });
    await createTable('SyncedPhotos', { id: 'INTEGER PRIMARY KEY', title: 'VARCHAR', size: 'VARCHAR', height: 'INTEGER', width: 'INTEGER', uri: 'VARCHAR', quality: 'INTEGER' });
}
