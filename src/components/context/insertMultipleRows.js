import { customSqlExecution } from "../Utility/CDatabase";

export async function insertMultipleRows(imgs) {
    console.log('insertMultipleRows', imgs.length);
    let values = imgs.map((img) => `(${img.id},'${img.title}','${img.size}',${img.height},${img.width},'')`).join(',')
    const query = `INSERT INTO SyncedPhotos (id, title, size, height, width, uri) VALUES ${values}`;
    await customSqlExecution(query);
}