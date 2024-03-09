import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        alignItems: 'center',
        flex: 1,
        height: '100%',
        width: '100%',
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
    backButtonText: {
        fontSize: 20,
        color: 'white',
    },
    navButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    navButton: {
        width: '40%',
        height: '22%',
        alignItems: 'center',
        keepAspectRatio: 1,
        padding: 16,
        borderRadius: 6, 
        elevation: 2,
        backgroundColor: 'blue',
        padding: 15,
        margin: 20,
        justifyContent: 'center',
    },
    navButtonText: {
        fontSize: 20,
        color: 'white',
    },
    allowStoppingButton: {
        width: '45%',
        marginTop: 50,
        alignItems: 'center',
        padding: 16,
        borderRadius: 6, 
        elevation: 2,
        backgroundColor: 'yellow',
    },
    allowStoppingButtonText: {
        fontSize: 20,
        color: 'black',
    },
});

export default styles;