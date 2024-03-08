import { StyleSheet } from "react-native";


const soundBoardStyles = StyleSheet.create({
    soundBoardButton: {
        width: '30%',
        aspectRatio: 1,
        padding: 16,
        borderRadius: 6, 
        elevation: 2,
        backgroundColor: 'blue',
        margin: '1.5%',
    },
    soundBoardButtonText: {
        color: "white", 
        textAlign: 'center',
    },
    soundBoardContainer: {
        marginTop: 50,
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
    },
});

export default soundBoardStyles;