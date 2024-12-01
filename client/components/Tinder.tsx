import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native'
import { ThemedText } from "./ThemedText";
import { useStreaks } from '../hooks/useStreaks';

import { Colors } from '@/constants/Colors';

export default function Tinder() {

    const { getStreakInfo, uploadStreakInfo, checkIfSameAffirmation } = useStreaks();

    const [streak, setStreak] = useState<number>(0); // Current streak
    const [longestStreak, setLongestStreak] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false); 
    const [error, setError] = useState<string | null>(null);

    // Fetch streak data and update components state
    useEffect(() => {
        const fetchStreakData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getStreakInfo();
                setStreak(data.currentStreak || 0);
                setLongestStreak(data.longestStreak || 0);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch streak information.');
            } finally {
                setLoading(false);
            }
        };

        fetchStreakData();
    }, []);

    // Validate new affirmation
    const handleNewAffirmation = async (newAffirmation: string) => {
        if (checkIfSameAffirmation(newAffirmation)) {
            console.log('Affirmation is the same. Streak will not increase.');
            return;
        }

        try {
            setLoading(true);
            await uploadStreakInfo({
                currentStreak: streak + 1, // Streak increases by 1
                longestStreak: Math.max(streak + 1, longestStreak), // Update to the higher of the current or previous longest streak
                content: newAffirmation,
            });
            setStreak(streak + 1);
            setLongestStreak(Math.max(streak + 1, longestStreak));
            console.log('Streak updated successfully!');
        } catch (err) {
            console.error('Failed to update streak:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
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