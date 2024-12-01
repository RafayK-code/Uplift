import { Image, Text, View, SafeAreaView, StyleSheet, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';


import Messages from '../components/messages';

import { useCurrentTime } from '@/hooks/useCurrentTime';
import { useStreaks } from '@/hooks/useStreaks';
import { BlurView } from 'expo-blur';

export default function MainDisplay() {

    const currentTime = useCurrentTime();

    const [text, setText] = useState<string>('');
    const [currentStreak, setCurrentStreak] = useState<number>(0);

    const { 
        getStreakInfo, 
        uploadStreakInfo, 
        checkIfSameAffirmation, 
        streakResponseData, 
        streaksLoading, 
        error 
    } = useStreaks();

    // Handle new affirmation submission
    const handleNewAffirmation = async (newAffirmation: string) => {
        if (checkIfSameAffirmation(newAffirmation)) {
            return false;
        }
    
        try {
            if (streakResponseData == null)
                return;

            const today = new Date();
            today.setHours(0, 0, 0, 0);
    
            var newCurrentStreak = streakResponseData.currentStreak;
            if (today > streakResponseData.lastStreakDate) {
                newCurrentStreak++;
            }
    
            var longestStreak = Math.max(newCurrentStreak, streakResponseData.longestStreak)
    
            await uploadStreakInfo({
                currentStreak: newCurrentStreak, // Increment streak
                longestStreak: longestStreak, // Update longest streak
                content: newAffirmation,
            });
            
            setCurrentStreak(newCurrentStreak);
            return true;
        } catch (err) {
            console.error('Failed to update streak:', err);
            return false;
        }
    };

    const sendMessage = async () => {
        // empty message
        if (text.trim().length === 0) {
            Alert.alert('Error', 'Empty Message');
            return;
        }

        const result = await handleNewAffirmation(text.trim());
        console.log(result);

        if (result) {
            setText('');
        }
    }
    
    useEffect(() => {
        getStreakInfo()
    }, [])

    useEffect(() => {
        setCurrentStreak(streakResponseData?.currentStreak || 0);
    }, [streakResponseData])

    return (
        
        <ThemedView style={[styles.themeView, { flex: 1 }]}>
            <SafeAreaView />
            <View style={styles.toolsView}>
            <Image
                    source={require('@/assets/images/tools.svg')}
                    style={styles.icon}
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

                        <View style={styles.streakContainer}>
                            {/* Fire Icon */}
                            <Image
                                source={require('@/assets/images/tinder.png')}
                                style={styles.tinder}
                                resizeMode="contain"
                            />
                            {/* Streak Number */}
                            <ThemedText style={styles.streakText}>
                                {currentStreak}
                            </ThemedText>
                        </View>

                    </View>
                </LinearGradient>

                <View style={styles.otherDisplay}>
                    <Messages/>
                </View>
            </ScrollView>

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
        marginBottom: '-35%', 
        zIndex: 1,
    },

    messageContainer: {
        width: '60%', 
        top: '10%',
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
    icon: {
        width: 40,
        height: 40,
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
    toolsView: {
        // marginLeft: "80%",
        // marginTop: '5%',
        position: 'absolute',
        top: '3%',
        left: '7%',
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
