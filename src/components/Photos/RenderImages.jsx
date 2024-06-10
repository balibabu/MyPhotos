import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import ImageCard from './ImageCard'
import LongPressModal from './LongPressModal';

export default function RenderImages({ images, navigation, deleteImage }) {
    const columnCount = 3;
    const [selectedImg, setSelectedImg] = useState(false);
    return (
        <View>
            <FlatList
                data={images}
                renderItem={({ item, index }) => <ImageCard {...{ item, index, navigation, columnCount, setSelectedImg }} />}
                keyExtractor={item => item.id}
                windowSize={columnCount}
                // initialNumToRender={5}
                numColumns={columnCount}
            />
            <LongPressModal {...{ selectedImg, setSelectedImg, deleteImage }} />
        </View>
    )
}
