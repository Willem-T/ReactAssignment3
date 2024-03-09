import { StyleSheet } from "react-native";


const soundBoardStyles = StyleSheet.create({
    soundBoardButton: {
        width: '30%',
        height: '30%',
        aspectRatio: 1,
        padding: 16,
        borderRadius: 6, 
        elevation: 2,
        margin: '1.5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    soundBoardButtonText: {
        color: "white", 
        textAlign: 'center',
        fontSize: 20,
    },
    soundBoardContainer: {
        marginTop: '30%',
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
    },
});

export default soundBoardStyles;