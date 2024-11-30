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
            <ThemedText style={{fontFamily: 'monospace', fontWeight: 'bold'}}>{streak}</ThemedText>
        </View>
    );
}


const styles = StyleSheet.create({
    streakContainer: {
        marginTop: 50,
        width: 80,
        aspectRatio: 1,
        borderRadius: 50,
        backgroundColor: Colors.light.background,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    tinder: {
        height: 40,
    },
});