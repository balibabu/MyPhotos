import React from 'react'
import { Dimensions, Image, View } from 'react-native';

export default function ImgCard({ image, columnCount }) {
    const { width } = Dimensions.get('window');
    return (
        <View width={width / columnCount} height={width / columnCount}>
            <View className='bg-black m-1 p-1'>
                <Image source={{ uri: 'file://' + image.path }} style={{ width: '100%', height: '100%' }} />
            </View>
        </View>
    )
}
