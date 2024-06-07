import React, { useContext, useState } from 'react'
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler';
import VariableContext from '../../components/context/VariableContext';
import IntelligentSize from '../../components/Utility/IntelligentSize';
import ZoomableImage from './ZoomableImage';


export default function CustomFullImgViewer(props) {
    const [showDetail, setShowDetail] = useState(false);
    const { syncedImgs, variables, setSyncedImgs } = useContext(VariableContext);
    const image = syncedImgs[props.route.params.index];
    const { width, height } = Dimensions.get('window');

    const handleSwipe = (d) => {
        // console.log(d);
        const { velocityX, velocityY, numberOfPointers } = d.nativeEvent;
        const threshold = 1000;
        if (velocityX > threshold) {
            props.navigation.navigate('FullScreen', { index: props.route.params.index === 0 ? 0 : props.route.params.index - 1 })
        } else if (velocityX < -threshold) {
            props.navigation.navigate('FullScreen', { index: props.route.params.index === syncedImgs.length - 1 ? syncedImgs.length - 1 : props.route.params.index + 1 })
        } else if (velocityY > threshold) {
            if (showDetail) {
                setShowDetail(false);
            } else {
                props.navigation.goBack();
            }
        } else if (velocityY < -threshold) {
            setShowDetail(true);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                <Swipeable onActivated={handleSwipe}>
                    <Image
                        source={{ uri: image.uri }}
                        style={{ width, height }}
                        resizeMode='contain'
                    />
                </Swipeable>
            </View> */}
            <ZoomableImage {...{ image, handleSwipe }} />
            {
                showDetail &&
                <View className='bg-gray-950 pl-4 pb-4'>
                    <Text>{image.title}</Text>
                    <Text>size: {IntelligentSize(image.size)}</Text>
                    <Text>resolution: {image.width}x{image.height}</Text>
                    <Text>{image.uri.includes('file:////data/user/') ? 'cloud' : 'local'}</Text>
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});