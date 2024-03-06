import { Pressable, View, Text } from "react-native";
import Styles from "../styles/styleSheet.js";
import { useNavigation } from "expo-router";

export default BackButton = ({text}) => {
    const navigate = useNavigation();
    return (
        <View style={Styles.backButton}>
        <Pressable
            onPress={() => navigate.goBack()}
        >
            <Text>{text}</Text>
        </Pressable>
        </View>
    );
}