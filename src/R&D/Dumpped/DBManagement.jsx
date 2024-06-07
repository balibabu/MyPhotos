import React from 'react'
import { Button, Text, View } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage';
import { createTable, deleteRow, fetchRows, insertRow } from '../../components/Utility/CDatabase';


let db = openDatabase({ name: 'UserDatabase.db', location: 'default' });
export default function DBManagement() {

    async function createtable() {
        let fields = { id: 'INTEGER PRIMARY KEY AUTOINCREMENT', name: 'VARCHAR(20)' };
        const result = await createTable(  'Table1', fields);
        console.log(result);
    }

    async function insertRow1() {
        const result = await insertRow(  'Table1', values = { name: 'babu' })
        console.log(result);
    }

    async function getRows() {
        const rows = await fetchRows(  'Table1');
        console.log(rows);
    }

    async function deleteArow() {
        const rows = await deleteRow(  'Table1', "name='babu'");
        console.log(rows);
    }

    return (
        <View>
            <Button title='createtable' onPress={createtable} />
            <Button title='insert' onPress={insertRow1} />
            <Button title='getRows' onPress={getRows} />
            <Button title='deleteArow' onPress={deleteArow} />
        </View>
    )
}
