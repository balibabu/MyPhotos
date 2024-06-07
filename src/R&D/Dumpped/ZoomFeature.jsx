import React, { useContext } from 'react'
import { Dimensions, Image, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import VariableContext from '../../components/context/VariableContext';

export default function ZoomFeature({ navigation }) {
    const { variables, syncedImgs } = useContext(VariableContext);
    const { width, height } = Dimensions.get('window');
    return (
        <View>
            <FlatList
                data={syncedImgs}
                renderItem={({ item, index }) => <TouchableOpacity onPress={() => navigation.navigate('ImageViewer', { index })}><View><Image source={{ uri: item.uri }} width={width / 4} height={width / 4} /></View></TouchableOpacity>}
                keyExtractor={item => item.id}
                numColumns={4}
            />
        </View>
    )
}

