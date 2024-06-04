import { openDatabase } from 'react-native-sqlite-storage';
let db = openDatabase({ name: 'myphotos.db', location: 'default' });

export async function createTable(tableName, fields) { //fields={'name':'Varchar(20)', 'id':'autoincrement'}
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${Object.entries(fields).map((entry) => `${entry[0]} ${entry[1]}`).join(', ')})`
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`,
                [],
                (_, res) => {
                    if (res.rows.length === 0) {
                        txn.executeSql(
                            `DROP TABLE IF EXISTS ${tableName}`,
                            [],
                            () => {
                                txn.executeSql(
                                    query,
                                    [],
                                    (_, res2) => resolve(res2),
                                    error => reject(error)
                                )
                            },
                            error => reject(error)
                        );
                    } else {
                        resolve('table already exists')
                    }
                },
                error => reject(error)
            )
        })
    })
}

export async function insertRow(tableName, values) { // values={name:'something',email:'sometjing',address:'something'}
    return new Promise((resolve, reject) => {
        const fieldNames = Object.keys(values);
        const fieldValues = fieldNames.map((key) => values[key])
        let query = `INSERT INTO ${tableName} (${fieldNames.join(', ')}) VALUES (${fieldNames.map((key) => '?').join(',')})`
        db.transaction(txn => {
            txn.executeSql(
                query,
                fieldValues,
                (tx, results) => {
                    resolve(results.rowsAffected)
                },
                error => reject(error)
            )
        })
    })
}

export async function fetchRows(tableName) {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM ${tableName}`,
                [],
                (_, res) => {
                    const values = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        values.push(res.rows.item(i));
                    }
                    resolve(values)
                },
                error => reject(error)
            )
        })
    })
}

export async function deleteRow(tableName, query) { //query can be, id=1 or name='baby'
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `DELETE FROM ${tableName} where ${query}`,
                [],
                (_, res) => resolve(res),
                error => reject(error)
            )
        })
    })
}

export async function customSqlExecution(query) {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                query,
                [],
                (_, res) => resolve(res),
                error => reject(error)
            )
        })
    })
}