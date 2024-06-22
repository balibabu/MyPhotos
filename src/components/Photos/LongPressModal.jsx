import React, { useContext } from 'react'
import { Image, Modal, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import CButton from '../Utility/CButton';
import Share from 'react-native-share';
import VariableContext from '../context/VariableContext';
import fullQualityDownloader from '../ZoomFeature/fullQualityDownloader';

export default function LongPressModal({ selectedImg, setSelectedImg }) {
    const { deleteImage, variables, setSyncedImgs } = useContext(VariableContext);

    async function shareHandler() {
        setSelectedImg(false);
        try {
            if (selectedImg.quality === 0) {
                ToastAndroid.show('Downloading full quality image, please wait', ToastAndroid.SHORT);
                await fullQualityDownloader(selectedImg, variables.Token, setSyncedImgs);
            }
            let uri = '';
            setSyncedImgs((prev) => {
                const selImg = prev.find((img) => img.id === selectedImg.id);
                uri = selImg.uri;
                return prev;
            })
            await Share.open({ url: uri });
        } catch (error) {
            console.log(error);
        }
    }

    function deleteHandler() {
        deleteImage(selectedImg);
        setSelectedImg(false);
    }

    return (
        <Modal visible={selectedImg !== false}
            animationType="slide"
            onRequestClose={() => {
                setSelectedImg(false);
            }}
        >

            <TouchableOpacity onPress={() => setSelectedImg(false)} activeOpacity={1}>
                <Image source={{ uri: selectedImg.uri }} style={{ width: '100%', height: '50%' }} />
                <View className='bg-gray-900 h-full' />
            </TouchableOpacity>

            <View style={styles.container} className='bg-gray-900 opacity-90 pt-4 pb-1 rounded-t-3xl'>
                {/* <CButton title='Open' onClick={() => navigation()} style={{ text: 'bg-sky-500 text-sky-100 font-bold text-center text-xl p-1 mx-2 mb-2 rounded-full' }} /> */}
                <CButton title='Share' onClick={shareHandler} style={{ text: 'bg-green-500 text-sky-100 font-bold text-center text-xl p-1 mx-2 mb-2 rounded-full' }} />
                <CButton title='Delete' onClick={deleteHandler} style={{ text: 'bg-red-500 text-sky-100 font-bold text-center text-xl p-1 mx-2 mb-2 rounded-full' }} />
                <CButton title='Cancel' onClick={() => setSelectedImg(false)} style={{ text: 'bg-slate-500 text-sky-100 font-bold text-center text-xl p-1 mx-2 mb-2 rounded-full' }} />
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        bottom: '0%',
        justifyContent: 'flex-end',
    },
});