import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function CButton({ title, onClick = () => { }, style = {} }) {
    return (
        <View className={style.container}>
            <TouchableOpacity onPress={onClick}>
                <Text className={style.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}
