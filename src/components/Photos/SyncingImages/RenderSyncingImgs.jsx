import React, { useContext, useEffect } from 'react'
import { FlatList, ToastAndroid, View } from 'react-native';
import VariableContext from '../../context/VariableContext';
import ImgCard from './ImgCard';
import { styles } from '../../Utility/styles';

export default function RenderSyncingImgs() {
    const { syncingImgs } = useContext(VariableContext);
    const columnCount = 3;

    useEffect(() => {
        if (syncingImgs.length > 0) {
            ToastAndroid.show(`Syncing ${syncingImgs.length} images`, ToastAndroid.LONG);
        }
    }, [syncingImgs.length > 0])

    return (
        <View className='p-1 bg-sky-900' style={styles.container}>
            <FlatList
                data={syncingImgs}
                renderItem={({ item }) => <ImgCard {...{ image: item, columnCount }} />}
                keyExtractor={(_, i) => i}
                windowSize={columnCount}
                numColumns={columnCount}
            />
        </View>
    )
}
