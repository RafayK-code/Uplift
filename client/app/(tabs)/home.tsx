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
            <View style={styles.affirmation}>

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
      width: '100%', // 50% of the screen width
      height: '18%', // 20% of the screen height
      backgroundColor: '#000000', // Background color
      justifyContent: 'center', // Align text vertically
      alignItems: 'center', // Align text horizontally
      borderRadius: 10, // Optional: rounded corners
    }
});
