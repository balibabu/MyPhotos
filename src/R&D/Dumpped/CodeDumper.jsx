import React from 'react'

export default function CodeDumper() {
    return (
        <div>CodeDumper</div>
    )
}

// ShowingImages
/* 
import React from 'react'
import { Button, Dimensions, Image, PermissionsAndroid, Platform, View } from 'react-native'
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

export default function Testing() {
    const { width, height } = Dimensions.get('window');

    const requestStoragePermission = async () => {
        try {
            if (Platform.OS === 'android' && Platform.Version >= 23) {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES, // Only for Android 13 and above
                ]);

                if (
                    granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED &&
                    (Platform.Version < 33 || granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED)
                ) {
                    console.log('You have access to the storage');
                } else {
                    console.log('Storage permission denied');
                }
            }
        } catch (err) {
            console.warn(err);
        }
    };


    async function shareImage() {
        // const shareOption = {
        //     url: 'file:////storage/emulated/0/Pictures/Stylize/1703788036001.png'
        // }
        // await Share.open(shareOption);
        // const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        // const res=await PermissionsAndroid.request(permission);
        // console.log(res);
        // const hasPermission = await PermissionsAndroid.check(permission);
        // if (!hasPermission) {
        // }
        // console.log('done', hasPermission);
        const path = RNFS.DocumentDirectoryPath + `/hq/`;
        const status = await RNFS.exists(path);
        if (!status) { await RNFS.mkdir(path) }
        
        console.log(status);
    }

    return (
        <View className='bg-sky-950'>
            <Button title='share' onPress={shareImage} />
            <Image
                source={{ uri: 'file:////storage/emulated/0/Pictures/Stylize/1703788036001.png' }}
                style={{ width, height }}
                resizeMode='contain'
            />
        </View>
    )
}


<View className='flex-row px-2 py-1 bg-gray-900 justify-between'>
    <View className='flex-row w-11/12'>
        <Text className='pt-1 text-md font-semibold text-gray-400 italic'>Folder Loc: </Text>
        <TextInput className='p-0 text-md font-semibold text-gray-400 bg-gray-700 w-full' placeholder='/folder/nested-folder/' value={folderLoc} onChangeText={(text) => setFolderLoc(text)} />
    </View>
    <TouchableOpacity onPress={changePath}>
        <View className='bg-sky-700 px-2 py-1'>
            <Text className='p-0 font-semibold text-gray-400'>done</Text>
        </View>
    </TouchableOpacity>
</View> 



    async function test() {
        // const path = RNFS.DocumentDirectoryPath + '/img1.jpg';
        // const url = 'https://balib.pythonanywhere.com/photu/download/124/0/';
        // DownloadImg(url, path);

        const result = await RNFS.readDir(RNFS.DocumentDirectoryPath);
        result.map((item)=>{
            console.log(item.path);
        })
    }

        async function setImages() {
        let images = [];
        for (let folder of folders) {
            const files = await getFiles(folder.path);
            images = [...images, ...files]
        }
        images.sort((a, b) => new Date(a.mtime) - new Date(b.mtime))
        setLocalImgs(images);
    }

        async function performActions() {
        await askForMediaPermission();
        await createTable('Folder', { path: 'VARCHAR PRIMARY KEY', syncedUpto: 'VARCHAR' }); // syncedUpto is mtime of last file from sorted files acc. mtime
        await createTable('Variables', { name: 'VARCHAR PRIMARY KEY', value: 'VARCHAR' });
        // await createTable('LocalSynced', { title: 'VARCHAR', size: 'VARCHAR', PRIMARY: 'KEY (title, size)' });
        await createTable('SyncedPhotos', { id: 'INTEGER PRIMARY KEY', title: 'VARCHAR', size: 'VARCHAR', height: 'INTEGER', width: 'INTEGER', uri: 'VARCHAR' });
        await getFolders();
        await getVariables();
    }


        async function syncingOps() {
        if (variables.Token) {
            const images = await getSyncedImages();
            const unsyncedImages = await syncServerImages(images);
            const tmp_syncedImgs = [...unsyncedImages, ...images];
            setSyncedImgs(tmp_syncedImgs);
            const localImgs = await getFoldersImages(folders);
            await localImageSyncer(localImgs, variables.Token, tmp_syncedImgs, setSyncedImgs);
            getSyncedImages() //from table
        }
    }

    
*/