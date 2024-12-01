import { View, Text, StyleSheet, Image } from 'react-native'
import { ThemedText } from "./ThemedText";

import { Colors } from '@/constants/Colors';

export default function Tinder() {

    const streak = 3;

    return (
        <View style={ styles.streakContainer }>
            <Image
                source={require('@/assets/images/tinder.png')}
                style={styles.tinder}
                resizeMode="contain"
            />
            <ThemedText style={styles.streakText}>{streak}</ThemedText>
        </View>
    );
}


const styles = StyleSheet.create({
    streakContainer: {
        marginTop: 30,

        width: 50,
        aspectRatio: 1,
        borderRadius: 50,
        backgroundColor: Colors.light.background,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    tinder: {
        height: 20,
    },

    streakText: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 12,
    }
});