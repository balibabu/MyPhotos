import React from 'react'
import { View } from 'react-native'

export default function Verticaldots({ width = 10, height = 2, dot = 'bg-teal-300 mb-1 rounded' }) {

    return (
        <View style={{ height: '100%', justifyContent: 'center', paddingTop: 5, paddingHorizontal: 10 }}>
            <View {...{ width, height }} className={dot} />
            <View {...{ width, height }} className={dot} />
            <View {...{ width, height }} className={dot} />
        </View>
    )
}
