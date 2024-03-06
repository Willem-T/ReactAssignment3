import { Pressable, View, Text } from "react-native";

export default soundBoardButton = ({ title, style, onPressEvent, onLongPressEvent }) => {
    return (
        <View style={style}>
                <Pressable
                    onPress={onPressEvent}
                    onLongPress={onLongPressEvent}
                    title={title}
                >
                    <Text>{title}</Text>
                </Pressable>
        </View>
    );
}