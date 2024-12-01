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

interface DailyOverlayProps {
    onSubmit: (submitted: boolean) => void;
}

function DailyOverlay({ onSubmit }: DailyOverlayProps): JSX.Element {
    const [text, setText] = useState<string>('');

    const handleSubmit = () => {
        if (text.trim().length === 0) {
            Alert.alert('Error', 'Please enter a valid input');
            return;
        }
        onSubmit(true); // Notify the parent that submission is complete
    };

    const [texty, setTexty] = useState('');

    const sendMessage = () => {
        // empty message
        if (text.trim().length === 0) {
            Alert.alert('Error', 'Empty Message');
            return;
        }

        const timestamp = new Date();
        setText('');

    }   

    return (
        <View style={styles.container}>
            <View style={styles.midContainer}>
                <ThemedText style={styles.title}>How are you feeling today?</ThemedText>
            </View>
            <View style={styles.mainContainer}>
            <View style={styles.borderContainer}>
                    <View style={styles.inputRow}>
                        <TextInput 
                            style={styles.inputBox}
                            placeholder="Type what comes to mind :)" 
                            placeholderTextColor="gray"
                            value={texty}
                            onChangeText={setTexty}
                        />
                        
                    </View>
            </View>
        </View>
        <Pressable 
                        style={styles.sendButton}
                        onPress ={sendMessage}
                        >
                            <Text style={styles.sendText}>Submit</Text>
                        </Pressable>
        </View>
        // <Modal transparent={true} animationType="slide" visible={true}>
        //     <View style={styles.overlayContainer}>
        //         <View style={styles.overlayContent}>
        //             <Text style={styles.title}>Daily Prompt</Text>
        //             <TextInput
        //                 style={styles.inputBox}
        //                 placeholder="Enter some text"
        //                 value={text}
        //                 onChangeText={setText}
        //             />
        //             <Pressable style={styles.submitButton} onPress={handleSubmit}>
        //                 <Text style={styles.submitText}>Submit</Text>
        //             </Pressable>
        //         </View>
        //     </View>
        // </Modal>
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
        height: '80%'
    },

    inputBox: {
        flex: 1,
        height: '100%',
        width: '60%',
        top: '-90%',
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
    container: {
        position: 'absolute', // Position it on top of the screen
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        zIndex: 9999, // Ensure it's above other elements
      },
    midContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 20,
        width: '80%',
        height: '50%',
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
        fontSize: 24,
        marginBottom: 15,
        padding: 20,
        top: '20%',
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
