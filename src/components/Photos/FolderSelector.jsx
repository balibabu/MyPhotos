import React, { useContext } from 'react'
import { Button, FlatList, Text, View } from 'react-native'
import { pickDirectory } from 'react-native-document-picker';
import CButton from '../Utility/CButton';
import VariableContext from '../context/VariableContext';

export default function FolderSelector() {
    const { folders, addFolder, removeFolder } = useContext(VariableContext);

    async function onSelection() {
        try {
            const { uri } = await pickDirectory({ requestLongTermAccess: true });
            const folderPath = getPathFromUri(uri);
            addFolder(folderPath);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View className='flex-1 bg-gray-900'>
            {folders.length === 0 && <Text className='p-2 text-sky-200 text-xl'>No Folder selected</Text>}
            <FlatList
                data={folders}
                renderItem={({ item }) => <CButton {...{ title: item.path, onClick: () => removeFolder(item.path), style: { text: 'font-semibold text-sky-200 text-xl' } }} />}
                keyExtractor={(item, index) => index}
            />
            <Button title='Select Folder' onPress={onSelection} />
        </View>
    )
}

function getPathFromUri(uri) {
    const pathUri = uri.split('%3A')[1];
    const path = pathUri.replaceAll('%2F', '/');
    return '/' + decodeURI(path);
}