import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    Alert,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { BlurView } from 'expo-blur';

// interface DailyOverlayProps {
//     onSubmit: (submitted: boolean) => void;
// }
function DailyOverlay() {
    const [userInput, setUserInput] = useState<string>('');

    const handleSubmit = () => {
        if (userInput.trim().length === 0) {
            Alert.alert('Error', 'Please enter a valid input');
            return;
        }
        // Handle the submitted input as needed
        console.log("User Input Submitted:", userInput);
        // onSubmit(true); // Notify the parent that submission is complete
        setUserInput(''); // Reset the input field
    };

    return (
        // <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>How are you feeling today?</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="Type what comes to mind :)"
                    placeholderTextColor="gray"
                    value={userInput}
                    onChangeText={setUserInput}
                />
                <Pressable style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Submit</Text>
                </Pressable>
            </View>
        
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        // position: 'absolute',
        bottom: '-10%',
        width: '80%',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    
    borderContainer: {
        height: 150,
        width: '90%',
        marginVertical: 10,
        borderRadius: 20,
        borderColor: Colors.light.text,
        borderWidth: 1.5,
        overflow: 'hidden',
    },

    inputRow: {
        // flex: 1,
        flexDirection: 'row',
        top: '5%',
        alignItems: 'center',
        // justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: '20%', 
        width: '80%'
    },

    inputBox: {
        flex: 1,
        width: '100%',
        top: '0%',
        bottom: '90%'
        
    },

    sendButton: {
        backgroundColor: Colors.light.text,
        borderRadius: 15,
        top: '11%',
        height: 40,
        width: '72%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center'
    },

    sendText: {
        color: Colors.light.background,
        fontWeight: 'bold',
    },
    // container: {
    //     position: 'absolute', // Position it on top of the screen
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    //     zIndex: 9999, // Ensure it's above other elements
    //   },
    contentContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '80%',
        height: '50%',
        bottom: 10,

        // zIndex: 9996, // Ensure it's above other elements
        padding: 20,
    },
    overlayContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlayContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    title: {
        color: '#30397F',
        fontSize: 20,
        marginBottom: 5,
        padding: 20,
        top: '30%',
        zIndex: 9999, // Ensure it's above other elements
        textAlign: 'center'
    },
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default DailyOverlay;
