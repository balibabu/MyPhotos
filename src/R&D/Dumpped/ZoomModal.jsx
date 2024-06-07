import React, { useContext, useEffect } from 'react'
import VariableContext from '../../components/context/VariableContext';
import { Modal, Text } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default function ZoomModal(props) {
    const { syncedImgs } = useContext(VariableContext);
    const formatedImgs = syncedImgs.map((img) => ({ url: img.uri }));

    return (
        <Modal visible={true} transparent={true}>
            <Text className='text-xl text-sky-100 font-bold bg-sky-900 p-2'>Swipe Down To go back from the image</Text>
            <ImageViewer imageUrls={formatedImgs} index={props.route.params.index || 0}
                enableSwipeDown={true}
                swipeDownThreshold={0.5}
                onSwipeDown={() => {
                    props.navigation.goBack()
                }}
                saveToLocalByLongPress={false}
                onChange={(index) => {
                    console.log(index);
                }}
            />
        </Modal>
    )
}
