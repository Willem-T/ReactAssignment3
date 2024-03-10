import { StyleSheet } from "react-native";


const soundBoardStyles = StyleSheet.create({
    // Soundboard styles
    soundBoardButton: {
        width: '30%',
        height: '30%',
        aspectRatio: 1,
        padding: 16,
        borderRadius: 20, 
        elevation: 2,
        margin: '1.5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    soundBoardButtonText: {
        color: "black", 
        textAlign: 'center',
        fontSize: 20,
    },
    soundBoardContainer: {
        marginTop: '20%',
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
    },
    soundBoardButtonpermanentText: {
        color: "black", 
        textAlign: 'center',
        fontSize: 12,
        position: 'absolute',
        bottom: 0,
    },

    // Modal styles
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(88, 24, 69, 0.7)',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20,
        marginTop: '40%',
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '40%',
    },
    modalExitButton: {
        backgroundColor: '#C70039',
        width: '30%',
        height: '10%',
        borderRadius: 20,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        marginLeft: '35%',
    },
    modalRecordButton: {
        backgroundColor: '#FFC300',
        width: '30%',
        height: '20%',
        borderRadius: 20,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        marginLeft: '35%',
    },
    modalButton: {
        backgroundColor: '#FFC300',
        width: '30%',
        height: '20%',
        aspectRatio: 3 / 2, 
        borderRadius: 20,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        marginLeft: '1.5%', 
    },
    modalSoundsContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center', 
        marginTop: '5%', 
    },
    modalExitButtonText: {
        color: "white", 
        textAlign: 'center',
        fontSize: 20,
    },
});

export default soundBoardStyles;