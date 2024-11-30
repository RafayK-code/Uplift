import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, SafeAreaView, View, TextInput, Pressable } from 'react-native'


import { Colors } from '@/constants/Colors';

export default function home() {
    return (
        <ThemedView style={{ flex: 1 }}>
            <SafeAreaView/>
            
            <View style={styles.mainContainer}>
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
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    affirmation: {
      width: '6%', // 50% of the screen width
      height: '20%', // 20% of the screen height
      backgroundColor: '#4c669f', // Background color
      justifyContent: 'center', // Align text vertically
      alignItems: 'center', // Align text horizontally
      borderRadius: 10, // Optional: rounded corners
    }
});
