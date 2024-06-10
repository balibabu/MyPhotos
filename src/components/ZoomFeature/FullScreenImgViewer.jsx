import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler, PinchGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import VariableContext from '../context/VariableContext';
import IntelligentSize from '../Utility/IntelligentSize';
import { SafeAreaView } from 'react-native-safe-area-context';
import CButton from '../Utility/CButton';
import Share from 'react-native-share';
import fullQualityDownloader from './fullQualityDownloader';

let oldScale = 1;
let oldX = 0;
let oldY = 0;
let lastSwipeTime = 0;
export default function FullScreenImgViewer(props) {
    const [showDetail, setShowDetail] = useState(false);
    const { syncedImgs, deleteImage, variables, setSyncedImgs } = useContext(VariableContext);
    const image = syncedImgs[props.route.params.index];

    const { width, height } = Dimensions.get('window');
    const scale = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const [lastScale, setLastScale] = useState(1);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (image.quality === 0) {
            fullQualityDownloader(image, variables.Token, setSyncedImgs, setProgress);
            setProgress(1);
        } else {
            setProgress(0);
        }

    }, [image])


    const handlePinch = Animated.event(
        [{ nativeEvent: { scale } }],
        {
            useNativeDriver: true, listener: e => {
                const newScale = e.nativeEvent.scale;
                if (newScale > oldScale) {
                    setLastScale((prev) => prev >= 4 ? 4 : prev + 0.05);
                } else {
                    setLastScale((prev) => prev <= 0.8 ? 0.8 : prev - 0.05);
                }
                oldScale = newScale;
            }
        }
    );

    const handlePan = Animated.event(
        [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
        {
            useNativeDriver: true, listener: e => {
                const fingers = e.nativeEvent.numberOfPointers;
                if (fingers > 1) { return }
                if (lastScale > 1) {
                    const threshold = 5;
                    const newX = e.nativeEvent.translationX;
                    const newY = e.nativeEvent.translationY;
                    if (Math.abs(newX - oldX) > Math.abs(newY - oldY)) {
                        if (newX > oldX) { setLastX((prev) => prev + threshold) } else setLastX((prev) => prev - threshold);
                    } else {
                        if (newY > oldY) { setLastY((prev) => prev + threshold) } else setLastY((prev) => prev - threshold);
                    }
                    oldX = newX;
                    oldY = newY;
                } else {
                    setLastScale(1)
                    setLastX(0)
                    setLastY(0)
                    handleSwipe(e);
                }
            }
        }
    );

    const handleSwipe = (d) => {
        const currentTime = new Date().getTime();
        const { velocityX, velocityY } = d.nativeEvent;
        const threshold = 1000;
        if (currentTime - lastSwipeTime > 250) {
            if (velocityX > threshold) {
                props.navigation.navigate('FullImage', { index: props.route.params.index === 0 ? 0 : props.route.params.index - 1 })
            } else if (velocityX < -threshold) {
                props.navigation.navigate('FullImage', { index: props.route.params.index === syncedImgs.length - 1 ? syncedImgs.length - 1 : props.route.params.index + 1 })
            } else if (velocityY > threshold) {
                if (showDetail) {
                    setShowDetail(false);
                } else {
                    props.navigation.goBack();
                }
            } else if (velocityY < -threshold) {
                setShowDetail(true);
            }

            lastSwipeTime = currentTime;
        }
    }

    const gestureStateChangeHandler = useCallback(() => {
        translateX.extractOffset();
        translateY.extractOffset();
    }, []);


    function onDoubleTap() {
        if (lastScale === 1) {
            setLastScale(2);
        } else if (lastScale > 1 && lastScale < 4) {
            setLastScale(4);
        } else {
            setLastScale(1)
            setLastX(0);
            setLastY(0);
        }
    }

    async function shareImage() {
        try {
            await Share.open({ url: image.uri });
        } catch (error) {
            console.log(error);
        }
        setShowDetail(false);
    }

    function deleteHandler() {
        deleteImage(image);
        props.navigation.goBack();
    }


    return (
        <SafeAreaView style={styles.container}>
            {progress > 0 && <Text style={styles.centeredText} className='bg-gray-950 p-1 text-gray-500 font-bold text-center'>Downloading full quality image. {progress}% completed</Text>}
            <PanGestureHandler onGestureEvent={handlePan} onHandlerStateChange={gestureStateChangeHandler}>
                <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                    <TapGestureHandler numberOfTaps={2} onActivated={onDoubleTap}>
                        <View>
                            <PinchGestureHandler onGestureEvent={handlePinch} >
                                <Animated.Image
                                    source={image && image.uri ? { uri: image.uri } : require('../../images/image.jpg')}
                                    style={[{ width, height }, { transform: [{ scale: lastScale }, { translateX: lastX }, { translateY: lastY }] }]}
                                    resizeMode='contain'
                                />
                            </PinchGestureHandler>
                        </View>
                    </TapGestureHandler>
                </Animated.View>
            </PanGestureHandler>
            {
                showDetail &&
                <View className='bg-gray-950 pl-4 pb-4 pt-2'>
                    <Text className='text-sky-100'>{image.title}</Text>
                    <Text className='text-sky-100'>size: {IntelligentSize(image.size)}</Text>
                    <Text className='text-sky-100'>resolution: {image.width}x{image.height}</Text>
                    <Text className='text-sky-100'>{image.uri.includes('file:////data/user/') ? 'cloud' : 'exists on device'}</Text>
                    <View className='flex-row w-full pr-4 mt-2'>
                        <CButton {...{ title: 'Share', onClick: shareImage, style: { text: 'bg-green-700 p-2 mr-1 rounded-full text-center font-bold  text-sky-100', container: 'flex-grow' } }} />
                        <CButton {...{ title: 'Delete', onClick: deleteHandler, style: { text: 'bg-red-700 p-2 ml-1 rounded-full text-center font-bold  text-sky-100', container: 'flex-grow' } }} />
                    </View>
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centeredText: {
        // position: 'absolute',
        // top: '90%',
        // // left: '50%',
        // transform: [{ translateY: -50 }],
        // fontSize: 18,
    },
});


