import React, { useEffect, useState } from 'react'
import { Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import RNFS from 'react-native-fs';
import askForMediaPermission from '../Utility/MediaPermission';
import FolderSelector from './FolderSelector';
import axios from 'axios';
import ImageCard from './ImageCard';
import FloatingBtn from '../Utility/FloatingBtn';

export default function ShowingImages({ navigation }) {
    const [folderLoc, setFolderLoc] = useState('/Tester/');
    const [image, setImage] = useState();
    const [items, setItems] = useState([]);

    useEffect(() => {
        askForMediaPermission();
        getFiles(folderLoc);
    }, [folderLoc])

    async function getFiles(path) {
        const result = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + path);
        setItems(result.slice(0, 50));
    }

    return (
        <View >
            {/* <FolderSelector {...{ setFolderPath: setFolderLoc }} /> */}
            <FlatList
                data={items}
                renderItem={({ item }) => <ImageCard {...{ item }} />}
                keyExtractor={item => item.name}
            />
        </View>
    )
}




// <View className='overflow-auto'>
//     {items.map((item, index) => (
//         <View key={index} width={200} height={200}>
//             <Image style={{ width: '95%', height: '95%' }} source={{ uri: 'file:///' + item.path }} />
//             {/* <Text>{item.name}</Text> */}
//         </View>
//     ))}
// </View>


// async function uploadImage(image) {
//     try {
//         const response = await fetch('https://balib.pythonanywhere.com/photu/download/124/0/', {
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Token 3fa825ddda4324fdb3dd3ee5b9b2cc042639e0ad',
//             },
//             responseType: 'blob'
//         })
//         console.log(response.status);
//         return response.blob();
//     } catch (error) {
//         console.log(error);
//     }
// }


// // async function testing() {
// //     const blob = await uploadImage();
// //     const fileReaderInstance = new FileReader();
// //     fileReaderInstance.readAsDataURL(blob);
// //     fileReaderInstance.onload = () => {
// //         base64data = fileReaderInstance.result;
// //         setImage(base64data);
// //     }
// //     // console.log(typeof (blob));
// //     // console.log(blob);
// //     // const url = URL.createObjectURL(blob);
// //     // console.log(url);
// //     // const url = window.URL.createObjectURL(blob);
// //     // setImage(blob);
// // }

// // function changePath() {
// //     console.log(typeof (image));
// // }