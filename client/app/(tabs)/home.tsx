import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, SafeAreaView, View, TextInput, Pressable, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

import MainDisplay from './maindisplay';

import { Colors } from '@/constants/Colors';

export default function home() {
    return (
        <ThemedView style={{ flex: 1 }}>
            <SafeAreaView/>
            
            <View style={styles.mainContainer}>
            <View style={styles.affirmation}></View>
            <View style={StyleSheet.compose(styles.affirmation, {top: height * 0.3, left: width * 0.8})}>
              </View>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({

    mainContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
    },
  
    affirmation: {
      width: '81%', // 50% of the screen width
      height: '18%', // 20% of the screen height
      top: height * 0.3, // 30% down from the top of the screen
      right: width * 0.05, // 25% from the left
      backgroundColor: '#000000', // Background color
      justifyContent: 'center', // Align text vertically
      alignItems: 'center', // Align text horizontally
      borderRadius: 10, // Optional: rounded corners
    }
});
