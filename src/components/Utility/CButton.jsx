import { Text, TouchableOpacity, View } from 'react-native'

export default function CButton({ title, onClick = () => { }, style = {} }) {
    return (
        <View className={style.container}>
            <TouchableOpacity onPress={onClick}>
                <Text className={style.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}
