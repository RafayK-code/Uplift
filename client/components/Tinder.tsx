import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native'
import { ThemedText } from "./ThemedText";
import { useStreaks } from '../hooks/useStreaks';

import { Colors } from '@/constants/Colors';

export default function Tinder() {
    const { 
        getStreakInfo, 
        uploadStreakInfo, 
        checkIfSameAffirmation, 
        streakResponseData, 
        streaksLoading, 
        error 
    } = useStreaks();

    // Fetch streak data when the component mounts
    useEffect(() => {
        getStreakInfo(); // Fetch data and update the hook's state
    }, []);

    // Handle new affirmation submission
    const handleNewAffirmation = async (newAffirmation: string) => {
        if (checkIfSameAffirmation(newAffirmation)) {
            console.log('Affirmation is the same. Streak will not increase.');
            return;
        }

        try {
            await uploadStreakInfo({
                currentStreak: (streakResponseData?.currentStreak || 0) + 1, // Increment streak
                longestStreak: Math.max((streakResponseData?.currentStreak || 0) + 1, streakResponseData?.longestStreak || 0), // Update longest streak
                content: newAffirmation,
            });
            console.log('Streak updated successfully!');
        } catch (err) {
            console.error('Failed to update streak:', err);
        }
    };

    if (streaksLoading) {
        return (
            <View style={styles.streakContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.streakContainer}>
                <Text style={{ color: 'red' }}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.streakContainer}>
            {/* Fire Icon */}
            <Image
                source={require('@/assets/images/tinder.png')}
                style={styles.tinder}
                resizeMode="contain"
            />
            {/* Streak Number */}
            <ThemedText style={styles.streakText}>
                {streakResponseData?.currentStreak || 0}
            </ThemedText>
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