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

    return (
        
        <ThemedView style={[styles.themeView, { flex: 1 }]}>
            <SafeAreaView />
            <View style={styles.backView}>
            <Image
                    source={require('@/assets/images/chevron-left.svg')}
                    style={styles.back}
                    resizeMode="contain"
                    />
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.titleContainer}>
                <ThemedText style={styles.info}>Info</ThemedText>
                
                </View>
                <View style={styles.username}>
                <ThemedText style={styles.item}>Username</ThemedText>
                <ThemedText style={styles.input}>jocelyn-chang</ThemedText>
                </View>
                <View style={styles.phone}>
                <ThemedText style={styles.item}>Username</ThemedText>
                {/* <ThemedText style={styles.number}>jocelyn-chang</ThemedText> */}
                </View>
            </View>
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

    titleContainer: {
        marginTop: '15%',
        alignItems: 'center'
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

    info: {
        fontSize: 25,
        textAlign: 'center',
    },
    back: {
        width: 50,
        marginBottom: 10
    },
    backView: {
        // marginLeft: "80%",
        // marginTop: '5%',
        position: 'absolute',
        top: '5%',
        left: '-2%',
        zIndex: 1000,
        // backgroundColor: 'rgba(255, 255, 255, 0.5)', // Optional: Semi-transparent background
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    themeView: {
        backgroundColor: 'transparent'
    },
    username: {
        marginLeft: '-50%',
        top: '5%',
        flexDirection: 'column',
    },
    item: {
        fontSize: 16
    },
    input: {
        fontSize: 16,
        marginTop: 10,
        color: Colors.light.lightgrey
    },
    phone: {
        marginLeft: '-80%',
        top: '15%',
        flexDirection: 'column',
    }

});
