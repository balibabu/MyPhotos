import React from 'react';
import {
    Alert,
    Button,
    Linking,
    PermissionsAndroid,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function Testing() {
    return (
        <Button title="Check Storage Permission" onPress={checkStoragePermission} />
    )
}




const requestCameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Cool Photo App Camera Permission',
                message:
                    'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
        } else {
            console.log('Camera permission denied');
        }
        console.log(granted);
    } catch (err) {
        console.warn(err);
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    item: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


const checkStoragePermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
  
        if (granted) {
          Alert.alert('Permission Granted', 'You already have storage access.');
          return true;
        } else {
          return requestStoragePermission();
        }
      }
    } catch (err) {
      console.warn(err);
    }
    return false;
  };
  
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to save files',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Granted', 'You can now access storage.');
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Denied',
          'You have chosen never to ask again. Please enable storage access from settings.',
          [
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
      } else {
        Alert.alert('Permission Denied', 'Storage access is denied.');
      }
    } catch (err) {
      console.warn(err);
    }
    return false;
  };
  