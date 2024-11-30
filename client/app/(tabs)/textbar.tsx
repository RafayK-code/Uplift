import { View, TextInput, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

import { Colors } from '@/constants/Colors';

export default function Textbar() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.borderContainer}>
                <BlurView intensity={50} style={styles.blurBox}>
                    <TextInput 
                        style={styles.inputBox}
                        placeholder="New affirmation" 
                        placeholderTextColor='#30397F'
                    />
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

    inputBox: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 20,
        borderRadius: 50,
        color: Colors.light.text, 
    },
});
