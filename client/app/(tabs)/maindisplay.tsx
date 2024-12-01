import { Image, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';


import Messages from '../../components/messages';
import Textbar from '../../components/textbar';

import { useCurrentTime } from '@/hooks/useCurrentTime';
import React from 'react';

export default function MainDisplay() {

    const currentTime = useCurrentTime();

    

    return (
        
        <ThemedView style={[styles.themeView, { flex: 1 }]}>
            <SafeAreaView />
            <View style={styles.userView}>
            <Image
                    source={require('@/assets/images/user-profile.svg')}
                    style={styles.user}
                    resizeMode="contain"
                    />
            </View>
            <ScrollView contentContainerStyle={styles.mainContainer}>
                <View style={styles.logoContainer}>
                <Image
                    source={require('@/assets/images/logo_small.png')}
                    style={styles.upliftLogo}
                    resizeMode="contain"
                    />
                
                </View>
                <LinearGradient 
                    colors={['#AFE3FF', '#FFF186', '#FFF']} // Gradient colors
                    locations={[0, 0.2221, 0.5483]} // Percentage positions converted to decimal (e.g., 22.21% = 0.2221)
                    start={{ x: 0, y: 0 }} // Start at the top
                    end={{ x: 0, y: 1 }}   // End at the bottom
                    style={styles.backgroundCircle} // Style for the gradient container
                />
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

            <Textbar />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        flexGrow: 1, // Allow ScrollView to expand based on content
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white'
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
        width: '60%', 
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
        marginBottom: '5%'
    },

    otherDisplay: {
        flex: 2,
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: -15,
        position: 'relative', 
        zIndex: 10,
        marginBottom: 65
    },

    upliftLogo: {
        width: 80,
    },
    backgroundCircle: {
        position: 'absolute',
        width: '140%', // Make the circle larger than the screen
        aspectRatio: 1, // Ensures it stays a perfect circle
        borderRadius: 500, // Rounds the edges fully to make it circular
        top: '-15%', // Adjust vertical position (negative pushes it up)
        left: '-25%', // Center it horizontally
        zIndex: -1, // Push it behind other elements
    },
    user: {
        width: 50,
        marginBottom: 10
    },
    userView: {
        // marginLeft: "80%",
        // marginTop: '5%',
        position: 'absolute',
        top: '5%',
        right: '-2%',
        zIndex: 1000,
        // backgroundColor: 'rgba(255, 255, 255, 0.5)', // Optional: Semi-transparent background
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    themeView: {
        backgroundColor: 'transparent'
    }

});
