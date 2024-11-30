import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, SafeAreaView, View, TextInput, Pressable, Dimensions, ScrollView, FlatList } from 'react-native'
const { width, height } = Dimensions.get('window');
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import Affirmation from '../../components/Affirmations';
import { useState } from 'react';

export default function Messages() {
  const [affirmations, setAffirmations] = useState([
    { id: '1', text: 'You got this' },
    { id: '2', text: 'You are amazing' },
    { id: '3', text: 'You look confident' },
]);

const renderAffirmation = ({ item }) => (
  <LinearGradient 
  colors={[Colors.light.yellow, Colors.light.blue]} // Gradient colors
  locations={[0.2785, 0.9698]} // Approximate percentage positions (27.85% and 96.98%)
  style={styles.affirmation}
  start={{ x: 1, y: 0 }} // Gradient starts from the right
  end={{ x: 0, y: 1 }}   // Gradient ends towards the bottom left
>
        <ThemedText style={styles.affirmationText}>{item.text}</ThemedText>
    </LinearGradient>
);
    return (
      <View style={styles.mainContainer}>
            <View style={styles.spacer}/>
            <View style={styles.section1}>
            <ThemedText style={styles.subtitle1}>
              From Us
            </ThemedText>
            <ScrollView horizontal={true} style={styles.horizontalScroll}>
            <FlatList
                    data={affirmations} // Data array for affirmations
                    renderItem={renderAffirmation} // Render each affirmation
                    keyExtractor={(item) => item.id} // Unique key for each affirmation
                    horizontal={true} // Enables horizontal scrolling
                    showsHorizontalScrollIndicator={false} // Hides scroll bar
                    contentContainerStyle={styles.affirmationsList}
                />
              {/* <ThemedText style={styles.toGallery}>See All</ThemedText> */}
            </ScrollView>
            </View>
            <View style={styles.section2}>
            <ThemedText style={styles.subtitle1}>
              From Friends
            </ThemedText>
            <ScrollView horizontal={true} style={styles.horizontalScroll}>
            <FlatList
                    data={affirmations} // Data array for affirmations
                    renderItem={renderAffirmation} // Render each affirmation
                    keyExtractor={(item) => item.id} // Unique key for each affirmation
                    horizontal={true} // Enables horizontal scrolling
                    showsHorizontalScrollIndicator={false} // Hides scroll bar
                    contentContainerStyle={styles.affirmationsList}
                />
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
      // justifyContent: 'center', // Align text vertically
      // alignItems: 'center', // Align text horizontally
      marginBottom: 5,
      borderRadius: 10, // Optional: rounded corners
      marginRight: 15,
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: 150
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
    },
    affirmationText: {
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 14,
      lineHeight: 15,
      textAlign: 'center'
  },
  affirmationsList: {
    marginLeft: 15
  }
});
