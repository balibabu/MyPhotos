import React, { useState } from 'react'
import { Button, Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CButton from '../components/Utility/CButton';

export default function Testing() {
    const { width } = Dimensions.get('window');
    const [isVisible, setIsVisible] = useState(false);
    let columnCount = 3
    return (
        <View>
            <View className='flex-row flex-wrap'>
                {/* <Image source={require('../images/image.jpg')} width={200} height={400} resizeMode='stretch' /> */}
                <View className='bg-sky-500 border-2 border-sky-100' style={{ alignItems: 'center', justifyContent: 'center', width: width / columnCount, height: width / columnCount }}><Text className='text-center pb-2'>IMG</Text></View >
                <View className='bg-sky-500 border-2 border-sky-100' style={{ alignItems: 'center', justifyContent: 'center', width: width / columnCount, height: width / columnCount }}><Text className='text-center pb-2'>IMG</Text></View >
                <View className='bg-sky-500 border-2 border-sky-100' style={{ alignItems: 'center', justifyContent: 'center', width: width / columnCount, height: width / columnCount }}><Text className='text-center pb-2'>IMG</Text></View >
                <View className='bg-sky-500 border-2 border-sky-100' style={{ alignItems: 'center', justifyContent: 'center', width: width / columnCount, height: width / columnCount }}><Text className='text-center pb-2'>IMG</Text></View >
                <Button title='model' onPress={() => setIsVisible(true)} />
            </View>
            <Modal visible={isVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    setIsVisible(false);
                }}
            >

                <TouchableOpacity onPress={() => setIsVisible(false)}>
                    <View className='bg-gray-900 opacity-75 h-full' />
                </TouchableOpacity>

                <View style={styles.container} className='bg-gray-900 opacity-80 pt-4 rounded-t-3xl'>
                    <CButton title='Open' onClick={() => setIsVisible(false)} style={{ text: 'bg-sky-500 text-sky-100 font-bold text-center text-xl p-1 mx-2 mb-2 rounded-full' }} />
                    <CButton title='Share' onClick={() => setIsVisible(false)} style={{ text: 'bg-green-500 text-sky-100 font-bold text-center text-xl p-1 mx-2 mb-2 rounded-full' }} />
                    <CButton title='Delete' onClick={() => setIsVisible(false)} style={{ text: 'bg-red-500 text-sky-100 font-bold text-center text-xl p-1 mx-2 mb-2 rounded-full' }} />
                    <CButton title='Cancel' onClick={() => setIsVisible(false)} style={{ text: 'bg-slate-500 text-sky-100 font-bold text-center text-xl p-1 mx-2 mb-2 rounded-full' }} />
                </View>
            </Modal>
        </View >
    )
}

const menus = [
    { title: 'Open', click: () => console.log('Open') },
    { title: 'Share', click: () => console.log('Share') },
    { title: 'Delete', click: () => console.log('Delete') },
];

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        bottom: '0%',
        justifyContent: 'flex-end',
    },
});