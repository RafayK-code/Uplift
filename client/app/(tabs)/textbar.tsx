import React, { useState } from 'react';
import { Alert, View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { BlurView } from 'expo-blur';

import { Colors } from '@/constants/Colors';

export default function Textbar() {

    const [text, setText] = useState('');

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
        <View style={styles.mainContainer}>
            <View style={styles.borderContainer}>
                <BlurView intensity={50} style={styles.blurBox}>
                    <View style={styles.inputRow}>
                        <TextInput 
                            style={styles.inputBox}
                            placeholder="New affirmation" 
                            placeholderTextColor="#30397F"
                            value={text}
                            onChangeText={setText}
                        />
                        <Pressable 
                        style={styles.sendButton}
                        onPress ={sendMessage}
                        >
                            <Text style={styles.sendText}>→</Text>
                        </Pressable>
                    </View>
                </BlurView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    
    borderContainer: {
        height: 50,
        width: '90%',
        marginVertical: 10,
        borderRadius: 50,
        borderColor: Colors.light.text,
        borderWidth: 1.5,
        overflow: 'hidden',
    },

    blurBox: {
        flex: 1,
        borderRadius: 50,
    },

    inputRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },

    inputBox: {
        flex: 1,
        height: '100%',
        color: Colors.light.text,
    },

    sendButton: {
        marginLeft: 15,
        backgroundColor: Colors.light.text,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },

    sendText: {
        color: Colors.light.background,
        fontWeight: 'bold',
    },
});
