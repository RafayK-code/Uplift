import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, SafeAreaView, View, TextInput, Pressable, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const { width, height } = Dimensions.get('window');

import MainDisplay from './maindisplay';

import { Colors } from '@/constants/Colors';

export default function home() {
    return (
        <ThemedView style={{ flex: 1 }}>
            <SafeAreaView/>
            <View style={styles.mainContainer}>
            <ScrollView style={styles.whole}>
            <View style={styles.spacer}/>
            <View style={styles.section1}>
            <ThemedText style={styles.subtitle1}>
              For You
            </ThemedText>
            <ScrollView horizontal={true} style={styles.horizontalScroll}>
            <LinearGradient 
                                colors={['#ff7e5f', '#feb47b']} // Add your gradient colors here
                                style={styles.affirmation1}
                                start={{ x: 0, y: 0 }} // Optional: gradient start point
                                end={{ x: 1, y: 1 }}   // Optional: gradient end point
                            >
                                <ThemedText style={{ color: 'white' }}>Affirmation 1</ThemedText>
                            </LinearGradient>
            <View style={styles.affirmation1}>
            <ThemedText style={{ color: 'white' }}>Affirmation 1</ThemedText>
            </View>
            <View style={styles.affirmation1}>
            {/* <ThemedText style={{ color: 'white' }}>Affirmation 1</ThemedText> */}
            </View>
            </ScrollView>
            </View>
            <View style={styles.section2}>
            <ThemedText style={styles.subtitle1}>
              For You
            </ThemedText>
            <ScrollView horizontal={true} style={styles.horizontalScroll}>
            
            <View style={styles.affirmation1}>
            <ThemedText style={{ color: 'white' }}>Affirmation 1</ThemedText>
            </View>
            <View style={styles.affirmation1}>
            {/* <ThemedText style={{ color: 'white' }}>Affirmation 1</ThemedText> */}
            </View>
            </ScrollView>
            </View>
            
            </ScrollView>
            <LinearGradient 
                                colors={['#ff7e5f', '#feb47b']} // Add your gradient colors here
                                style={styles.affirmation1}
                                start={{ x: 0, y: 0 }} // Optional: gradient start point
                                end={{ x: 1, y: 1 }}   // Optional: gradient end point
                            >
                                <ThemedText style={{ color: 'white' }}>Affirmation 1</ThemedText>
                            </LinearGradient>
      
            {/* <View style={styles.affirmation}>

            </View>
            <View style={styles.affirmation}>

            </View> */}
            </View>
            
        </ThemedView>
    );
}

const styles = StyleSheet.create({

    mainContainer: {
      flex: 1,
      flexDirection: 'column',
      // alignItems: 'center',
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
    affirmation1: {
      width: width * .8,
      height: height*.25,
      flexDirection: 'row',
      backgroundColor: '#000000', // Background color
      // justifyContent: 'center', // Align text vertically
      // alignItems: 'center', // Align text horizontally
      marginBottom: 5,
      borderRadius: 10, // Optional: rounded corners
      marginLeft: 15,
      // marginTop: 150
    },
    affirmation: {
      width: '80%',
      height: '25%',
      flexDirection: 'row',
      backgroundColor: '#000000', // Background color
      // justifyContent: 'center', // Align text vertically
      // alignItems: 'center', // Align text horizontally
      marginBottom: 15,
      borderRadius: 10, // Optional: rounded corners
      marginLeft: 15
    },
    subtitle1: {
      flexDirection: 'column',
      marginBottom: 10,
      color: 'black',
      marginLeft: 15
    },
    section1: {
      marginTop: 390,
      flexDirection: 'column'
    },
    whole:{
      flex: 1
    },
    section2: {
      marginTop: 15,
      flexDirection: 'column'
    },
    background: {
        position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
    }
});
