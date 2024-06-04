import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function FloatingBtn() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.fab}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    fab: {
        backgroundColor: 'blue',
        width: 60,
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
    fabText: {
        color: 'white',
        fontSize: 36,
    },
});