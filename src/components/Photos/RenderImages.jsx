import React from 'react'
import { FlatList, View } from 'react-native'
import ImageCard from './ImageCard'

export default function RenderImages({ images, navigation }) {
    const columnCount = 3;
    return (
        <View>
            <FlatList
                data={images}
                renderItem={({ item, index }) => <ImageCard {...{ item, index, navigation, columnCount }} />}
                keyExtractor={item => item.id}
                windowSize={columnCount}
                // initialNumToRender={5}
                numColumns={columnCount}
            />
        </View>
    )
}
