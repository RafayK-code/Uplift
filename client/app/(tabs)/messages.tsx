import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, SafeAreaView, View, TextInput, Pressable, Dimensions, ScrollView } from 'react-native'
const { width, height } = Dimensions.get('window');
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import Affirmation from '../../components/Affirmations';

export default function Messages() {
    return (
      <View style={styles.mainContainer}>
            <View style={styles.spacer}/>
            <View style={styles.section1}>
            <ThemedText style={styles.subtitle1}>
              For You
            </ThemedText>
            <ScrollView horizontal={true} style={styles.horizontalScroll}>
              <Affirmation affirmationText="I am capable of achieving anything I set my mind to!"/>
              <Affirmation affirmationText="I am capable of achieving anything I set my mind to!"/>
              <Affirmation affirmationText="I am capable of achieving anything I set my mind to!"/>
              <Affirmation affirmationText="I am capable of achieving anything I set my mind to!"/>
              <Affirmation affirmationText="I am capable of achieving anything I set my mind to!"/>
              <ThemedText style={styles.toGallery}>See All</ThemedText>
            </ScrollView>
            </View>
            <View style={styles.section2}>
            <ThemedText style={styles.subtitle1}>
              For You
            </ThemedText>
            <ScrollView horizontal={true} style={styles.horizontalScroll}>
            
            <Affirmation affirmationText="I am capable of achieving anything I set my mind to!"/>
            <Affirmation affirmationText="I am capable of achieving anything I set my mind to!"/>
            <Affirmation affirmationText="I am capable of achieving anything I set my mind to!"/>
            <Affirmation affirmationText="I am capable of achieving anything I set my mind to!"/>
            <Affirmation affirmationText="I am capable of achieving anything I set my mind to!"/>
            </ScrollView>
            </View>
          
      </View>
            
    );
}

const styles = StyleSheet.create({

    mainContainer: {
      width: '100%',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      color: Colors.light.background,
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
      width: '70vw',
      aspectRatio: 2,
      flexDirection: 'row',
      backgroundColor: Colors.light.text, // Background color
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
      flexDirection: 'column'
    },

    section2: {
      marginTop: 15,
      flexDirection: 'column'
    },

    toGallery: {
      color: Colors.dark.text,
      marginLeft: 15,
      alignItems: 'center',
      flex: 1
    }
});
