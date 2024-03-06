import { Pressable, View, Text } from "react-native";
import Styles from "../styles/styleSheet.js";
import { Link } from "expo-router";

export default NavButton = ({ text, style, path }) => {
    return (
        <View style={style}>
            <Link href={path} asChild> 
                <Pressable
                    onPress={() => { }}
                >
                    <Text>{text}</Text>
                </Pressable>
            </Link>
        </View>
    );
}