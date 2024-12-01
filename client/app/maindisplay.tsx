import { Image, Text, View, SafeAreaView, StyleSheet, Pressable, Alert, FlatList, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import VoiceflowButton from '../components/Voiceflow';

import { useCurrentTime } from '@/hooks/useCurrentTime';
import { useStreaks } from '@/hooks/useStreaks';
import { BlurView } from 'expo-blur';
import { AffirmationHistoryItem, useGenAffirmations } from '@/hooks/useGenAffirmations';
import { MailAffirmationHistoryItem, useMailAffirmations } from '@/hooks/useMailAffirmations';
import { useAuth0 } from '@auth0/auth0-react';

export default function MainDisplay() {

    const currentTime = useCurrentTime();

    const [text, setText] = useState<string>('');
    const [currentStreak, setCurrentStreak] = useState<number>(0);
    const [timeDisplay, setTimeDisplay] = useState(currentTime);
    const [messageDisplay, setMessageDisplay] = useState('Live, Laugh, Love, Serve Slay Survive, Lorem Ipsum');

    const { 
        getStreakInfo, 
        uploadStreakInfo, 
        checkIfSameAffirmation, 
        streakResponseData, 
        streaksLoading, 
        error 
    } = useStreaks();

    const {
        getAffirmationHistory,
        sendNewAffirmation,
        affirmationHistoryResponseData,
    } = useGenAffirmations();

    const {
        getAffirmationMail,
        sendNewMailAffirmation,
        affirmationMailResponseData,
    } = useMailAffirmations();

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

    const onPressCb = async (message: string, createdAt: Date) => {
        await sendNewAffirmation({
            content: message,
            createdAt: createdAt,
        }); 
    }

    const onMailPressCb = async (message: string, sentAt: Date) => {
        await sendNewMailAffirmation({
            content: message,
            sentAt: sentAt,
        });
    }
    
    useEffect(() => {
        getStreakInfo();
        getAffirmationHistory();
        getAffirmationMail();
    }, [])

    useEffect(() => {
        setCurrentStreak(streakResponseData?.currentStreak || 0);
    }, [streakResponseData])

    const { logout } = useAuth0();

    const renderAffirmation = ({ item }: { item: AffirmationHistoryItem }) => (
        <LinearGradient 
        colors={[Colors.light.yellow, Colors.light.blue]} 
        locations={[0.2785, 0.9698]} 
        style={styles.affirmation}
        start={{ x: 1, y: 0 }} 
        end={{ x: 0, y: 1 }}   
    >
      <View style={styles.affirmationDetails}>
      <ThemedText style={styles.affirmationText}>{item.content}</ThemedText>
      <ThemedText style={styles.affirmationDate}>{item.createdAt.toLocaleDateString()}</ThemedText>
      </View>
        </LinearGradient>
    );
    const renderMailAffirmation = ({ item }: { item: MailAffirmationHistoryItem }) => (
        <LinearGradient 
        colors={[Colors.light.yellow, Colors.light.blue]} 
        locations={[0.2785, 0.9698]} 
        style={styles.affirmation}
        start={{ x: 1, y: 0 }} 
        end={{ x: 0, y: 1 }}   
    >
      <View style={styles.affirmationDetails}>
      <ThemedText style={styles.affirmationText}>{item.content}</ThemedText>
      <ThemedText style={styles.affirmationDate}>{item.sentAt.toLocaleDateString()}</ThemedText>
      </View>
        </LinearGradient>
    );
    const renderEmptyAffirmationBox = () => (
      <LinearGradient 
        colors={['white', 'white']} // A simple gray box for empty affirmation
        locations={[0, 1]} 
        style={styles.emptyAffirmation}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <ThemedText style={styles.affirmationText}>So many affirmations to come</ThemedText>
      </LinearGradient>
    );

    const renderUserAffirmation = ({ item }: { item: string }) => (
        <LinearGradient 
        colors={[Colors.light.yellow, Colors.light.blue]} 
        locations={[0.2785, 0.9698]} 
        style={styles.affirmation}
        start={{ x: 1, y: 0 }} 
        end={{ x: 0, y: 1 }}   
    >
      <ThemedText style={styles.affirmationText}>{item}</ThemedText>
        </LinearGradient>
    );

    return (
        
        <ThemedView style={[styles.themeView, { flex: 1 }]}>
            <SafeAreaView />
            <View style={styles.toolsView}>
            <VoiceflowButton setTimeDisplay={setTimeDisplay} setMessageDisplay={setMessageDisplay} onPressCb={onPressCb} />
            </View>
            <View>
            <Button onPress={() => logout({ returnTo: "http://localhost:8081/login"})}>Log Out</Button>
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
                            <ThemedText style={styles.messageDisplay}>{messageDisplay}</ThemedText>
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
                <View style={styles.mainContainerMsg}>
                    <View style={styles.spacer}/>
                    <View style={styles.section1}>
                    <ThemedText style={styles.subtitle1}>
                      From Us
                    </ThemedText>
                    <ScrollView horizontal={true} style={styles.horizontalScroll}>
                    <FlatList
                            data={affirmationHistoryResponseData ? affirmationHistoryResponseData.items : []} // Data array for affirmations
                            renderItem={renderAffirmation} // Render each affirmation
                            keyExtractor={(item, index) => index.toString()}// Unique key for each affirmation
                            horizontal={true} // Enables horizontal scrolling
                            showsHorizontalScrollIndicator={false} // Hides scroll bar
                            contentContainerStyle={styles.affirmationsList}
                            ListEmptyComponent={renderEmptyAffirmationBox}
                        />
                      {/* <ThemedText style={styles.toGallery}>See All</ThemedText> */}
                    </ScrollView>
                    </View>
                    <View style={styles.section2}>
                    <ThemedText style={styles.subtitle1}>
                      Your Recent Self Affirmations
                    </ThemedText>
                    <ScrollView horizontal={true} style={styles.horizontalScroll}>
                    <FlatList
                            data={streakResponseData ? streakResponseData.affirmations : []} // Data array for affirmations
                            renderItem={renderUserAffirmation} // Render each affirmation
                            keyExtractor={(item, index) => index.toString()}// Unique key for each affirmation
                            horizontal={true} // Enables horizontal scrolling
                            showsHorizontalScrollIndicator={false} // Hides scroll bar
                            contentContainerStyle={styles.affirmationsList}
                            ListEmptyComponent={renderEmptyAffirmationBox}
                        />
                    </ScrollView>
                    </View>

                    <View style={styles.section2}>
                    <ThemedText style={styles.subtitle1}>
                      Affirmations From Others
                    </ThemedText>
                    <ScrollView horizontal={true} style={styles.horizontalScroll}>
                    <FlatList
                            data={affirmationMailResponseData ? affirmationMailResponseData.items : []} // Data array for affirmations
                            renderItem={renderMailAffirmation} // Render each affirmation
                            keyExtractor={(item, index) => index.toString()}// Unique key for each affirmation
                            horizontal={true} // Enables horizontal scrolling
                            showsHorizontalScrollIndicator={false} // Hides scroll bar
                            contentContainerStyle={styles.affirmationsList}
                            ListEmptyComponent={renderEmptyAffirmationBox}
                        />
                    </ScrollView>
                    </View>
          
                    </View>
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
    },

    mainContainerMsg: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        color: '#FFFFFF',
      },
  
      spacer: {
        flex: 1
      },
  
      horizontalScroll: {
        width: '100%',
        height: '25%',
        flexDirection: 'row',
        marginBottom: 5,
      },
      affirmation: {
        width: '70vw',
        aspectRatio: 2,
        flexDirection: 'row',
        backgroundColor: '#000000', // Background color
        marginBottom: 5,
        borderRadius: 10, // Optional: rounded corners
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.10)', // Shadow color
          shadowOffset: { width: 4, height: 4 }, // Shadow offset (like x and y)
          shadowOpacity: 1, // Opacity of the shadow
          shadowRadius: 3, // Blur radius
  
        marginLeft: 15,
        
      },
      emptyAffirmation: {
        width: '91vw',
        aspectRatio: 2,
        flexDirection: 'row',
        backgroundColor: '#000000', // Background color
        marginBottom: 5,
        borderRadius: 10, // Optional: rounded corners
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.10)', // Shadow color
          shadowOffset: { width: 4, height: 4 }, // Shadow offset (like x and y)
          shadowOpacity: 1, // Opacity of the shadow
          shadowRadius: 3, // Blur radius
  
        marginLeft: 15,
        
      },
      subtitle1: {
        flexDirection: 'column',
        marginBottom: 10,
        color: Colors.light.text,
        marginLeft: 20,
      },
      section1: {
        flexDirection: 'column'
      },
  
      section2: {
        marginTop: 15,
        flexDirection: 'column'
      },
  
      toGallery: {
        color: Colors.dark.text,
        alignItems: 'center',
        flex: 1
      },
      affirmationText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        lineHeight: 15,
        textAlign: 'center'
    },
    affirmationDate: {
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 10,
      lineHeight: 15,
      marginTop: 5,
      textAlign: 'center'
    },
    affirmationDetails: {
      width: '100%',
      flexGrow: 1, // Allow ScrollView to expand based on content
      flexDirection: 'column',
      alignItems: 'center',
    },
    affirmationsList: {
      marginLeft: 1
    }
});
