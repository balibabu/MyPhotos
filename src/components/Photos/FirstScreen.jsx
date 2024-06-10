import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { styles } from '../Utility/styles';
import CButton from '../Utility/CButton';
import RenderImages from './RenderImages';
import VariableContext from '../context/VariableContext';

export default function FirstScreen({ navigation }) {
    const { variables, syncedImgs, deleteImage } = useContext(VariableContext);


    if (!variables.Token) {
        return (
            <View style={styles.container} className='bg-gray-800 p-2'>
                <Text className='text-sky-100 text-xl text-center font-bold'>Please Login</Text>
                <CButton {...{ title: 'proceed', onClick: () => navigation.navigate('Login'), style: { text: 'bg-sky-900 p-2 m-2 rounded-md text-sky-100 text-xl text-center' } }} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }} className='bg-gray-950 p-1'>
            <RenderImages {...{ images: syncedImgs, navigation, deleteImage }} />
        </View>
    )
}