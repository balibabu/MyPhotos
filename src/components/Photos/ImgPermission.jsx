import React from 'react'
import { Button, PermissionsAndroid, Text, View } from 'react-native'

export default function ImgPermission() {

    async function askPermission() {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
        console.log(granted);
    }

    return (
        <View>
            <Button title='ask permission' onPress={askPermission} />
        </View>
    )
}
