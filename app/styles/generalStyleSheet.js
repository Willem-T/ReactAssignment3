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
});

export default styles;