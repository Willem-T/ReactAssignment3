import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
    },
    headerText: {
        fontSize: 40,
        padding: 20,
        fontWeight: 'bold',
    },
    backButton: {
        width: '40%',
        alignItems: 'center',
        padding: 16,
        borderRadius: 6, 
        elevation: 2,
        backgroundColor: 'red',
    },
    navButton: {
        width: '40%',
        alignItems: 'center',
        padding: 16,
        borderRadius: 6, 
        elevation: 2,
        backgroundColor: 'blue',
        padding: 15,
        margin: 20,
        
    },
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
    },
    soundBoardContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
    },
});

export default styles;