import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import Messages from './messages';

import { useCurrentTime } from '@/hooks/useCurrentTime';

export default function MainDisplay() {

    const currentTime = useCurrentTime();


    return (
        
        <ThemedView style={{ flex: 1 }}>
            <SafeAreaView />
            <ScrollView contentContainerStyle={styles.mainContainer}>
                <View style={styles.logoContainer}>
                    <ThemedText>Uplift</ThemedText>
                </View>
                
                <LinearGradient 
                    colors={['#FF87AD', '#C7CBFF', '#FFF']} // Gradient colors
                    locations={[0, 0.4203, 0.8757]} // Gradient positions
                    style={styles.circleMain}
                    start={{ x: 0, y: 0 }} // Start at the top
                    end={{ x: 0, y: 1 }}   // End at the bottom
                >
                    <View style={styles.messageContainer}>
                        <View>
                            <ThemedText style={styles.timeDisplay}>{currentTime}</ThemedText>
                        </View>
                        <View>
                            <ThemedText style={styles.messageDisplay}>Live, Laugh, Love, Serve Slay Survive, Lorum Ipsum</ThemedText>
                        </View>
                    </View>
                </LinearGradient>

                <View style={styles.otherDisplay}>
                    <Messages/>
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexGrow: 1, // Allow ScrollView to expand based on content
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20, // Add padding for better layout
    },

    logoContainer: {
        marginBottom: 20,
    },

    circleMain: {
        width: '130%',
        aspectRatio: 1,
        alignItems: 'center',
        borderRadius: 500,
        backgroundColor: Colors.light.pink,
        marginBottom: '-40%', 
        zIndex: 1,
    },

    messageContainer: {
        width: '80%', 
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    messageDisplay: {
        fontSize: 25,
        textAlign: 'center',
    },

    timeDisplay: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        marginBottom: '20%'
    },

    otherDisplay: {
        flex: 2,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 0,
        position: 'relative', 
        zIndex: 10,
    },
});
