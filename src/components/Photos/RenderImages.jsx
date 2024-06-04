import React from 'react'
import { FlatList, View } from 'react-native'
import ImageCard from './ImageCard'

export default function RenderImages({ images, navigation }) {
    return (
        <View>
            <FlatList
                data={images}
                renderItem={({ item, index }) => <ImageCard {...{ item, index, navigation }} />}
                keyExtractor={item => item.id}
                // windowSize={5}
                // initialNumToRender={5}
                numColumns={4}
            />
        </View>
    )
}
