import React, { useCallback, useRef, useState } from 'react'
import { Animated, Dimensions, View } from 'react-native'
import { PanGestureHandler, PinchGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';


let oldScale = 1;
let oldX = 0;
let oldY = 0;
export default function ZoomableImage({ image, handleSwipe }) {
    const { width, height } = Dimensions.get('window');
    const scale = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const [lastScale, setLastScale] = useState(1);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

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
                    setLastX(0)
                    setLastY(0)
                    handleSwipe(e);
                }
            }
        }
    );

    const gestureStateChangeHandler = useCallback(() => {
        translateX.extractOffset();
        translateY.extractOffset();
    }, []);


    function onDoubleTap() {
        if (lastScale === 1) {
            setLastScale(1.5);
        } else {
            setLastScale(1);
        }
        setLastX(0);
        setLastY(0);
    }

    return (
        <PanGestureHandler onGestureEvent={handlePan} onHandlerStateChange={gestureStateChangeHandler}>
            <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                <TapGestureHandler numberOfTaps={2} onActivated={onDoubleTap}>
                    <View>
                        <PinchGestureHandler onGestureEvent={handlePinch} >
                            <Animated.Image
                                source={{ uri: image.uri }}
                                style={[{ width, height }, { transform: [{ scale: lastScale }, { translateX: lastX }, { translateY: lastY }] }]}
                                resizeMode='contain'
                            />
                        </PinchGestureHandler>
                    </View>
                </TapGestureHandler>
            </Animated.View>
        </PanGestureHandler>
    )
}
