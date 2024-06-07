import React from 'react'
import { Button, Text, View } from 'react-native'
import CButton from '../../components/Utility/CButton'

export default function Header() {
    return (
        <View className='flex-row justify-between bg-sky-900'>
            <Text>Photos</Text>
            <Button title=':' style={{ color: 'red' }} onPress={() => { }} />
            {/* <CButton title='hi' /> */}
        </View>
    )
}
