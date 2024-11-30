import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, SafeAreaView, View, TextInput, Pressable, Dimensions, ScrollView } from 'react-native'

const { width, height } = Dimensions.get('window');

import MainDisplay from './maindisplay';

import { Colors } from '@/constants/Colors';

export default function home() {
    return (
        <ThemedView style={{ flex: 1 }}>
            <SafeAreaView/>
            <View style={styles.mainContainer}>
            <View style={styles.spacer}/>
            <ScrollView horizontal={true} style={styles.horizontalScroll} >
            <View style={styles.affirmation}>
            <ThemedText style={{ color: 'white' }}>Affirmation 1</ThemedText>
            </View>
            </ScrollView>
            <View style={styles.affirmation}>

            </View>
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
      width: '80%',
      height: '75%',
      flexDirection: 'column',
      marginBottom: 15,
    },
  
    affirmation: {
      width: '80%',
      height: '25%',
      flexDirection: 'column',
      backgroundColor: '#000000', // Background color
      // justifyContent: 'center', // Align text vertically
      // alignItems: 'center', // Align text horizontally
      marginBottom: 15,
      borderRadius: 10, // Optional: rounded corners
      marginLeft: 15
    }
});
