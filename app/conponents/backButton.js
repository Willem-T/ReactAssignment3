import { Pressable, View, Text } from "react-native";
import Styles from "../styles/generalStyleSheet.js";
import { useNavigation } from "expo-router";

export default BackButton = ({text}) => {
    const navigate = useNavigation();
    return (
        <Pressable
            style={Styles.backButton}
            onPress={() => navigate.goBack()}
        >
            <Text>{text}</Text>
        </Pressable>
    );
}