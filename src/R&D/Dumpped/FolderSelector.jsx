import React, { useEffect, useState } from 'react'
import { Button, PermissionsAndroid, Text, View } from 'react-native'
import { pickDirectory } from 'react-native-document-picker'
import RNFS from 'react-native-fs';

export default function FolderSelector() {
    const [possibleErrors, setPossibleErrors] = useState('');
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        // requestStoragePermission();
    }, [])


    async function onSelection() {
        try {
            const { uri } = await pickDirectory({
                requestLongTermAccess: true,
            })
            // setPossibleErrors(uri);
            console.log(uri);
            console.log(getPathFromUri(uri));

        } catch (err) {
            setPossibleErrors(err)
            console.error(err)
        }
    }

    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'STORAGE Permission',
                    message:
                        'Cool Photo App needs access to your STORAGE ' +
                        'STORAGE',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            console.log(PermissionsAndroid.RESULTS.GRANTED);
            // if ('granted' === PermissionsAndroid.RESULTS.GRANTED) {
            //     console.log('You can use the STORAGE');
            // } else {
            //     console.log('STORAGE permission denied');
            // }
        } catch (err) {
            console.warn(err);
        }
    };

    async function testing() {
        // const path=RNFS.ExternalStorageDirectoryPath+'/IDMP/Videos/'
        // const path=RNFS.DocumentDirectoryPath
        const path = 'content://com.android.externalstorage.documents/tree/primary%3ADCIM%2FCamera'

        RNFS.readDir(path)
            .then((result) => {
                console.log('GOT RESULT');
                console.log(result);
                setFolders(result);
                // const files = result.filter(item => !item.isDirectory());
                // console.log(files);
            })
            .catch((err) => {
                console.log(err.message, err.code);
            });

        // RNFS.writeFile(path+'/filename.txt', 'Lorem ipsum dolor sit amet', 'utf8')
        //     .then((success) => {
        //         console.log('FILE WRITTEN!');
        //     })
        //     .catch((err) => {
        //         console.log(err.message);
        //     });

        // await RNFS.mkdir(path+'/bali');
    }

    return (
        <View>
            <Button
                title="open directory"
                onPress={onSelection}
            />
            {possibleErrors && <Text>{possibleErrors}</Text>}
            <Button title='test' onPress={testing} />
            {
                folders.map((folder, i) => <Text key={i}>{folder.name}</Text>)
            }
        </View>
    )
}


function getPathFromUri(uri) {
    const pathUri = uri.split('%3A')[1];
    const path = pathUri.replaceAll('%2F', '/');
    return '/'+decodeURI(path);
}