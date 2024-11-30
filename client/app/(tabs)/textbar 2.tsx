import { View, TextInput, Pressable, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/ThemedText';

import { Colors } from '@/constants/Colors';

export default function Textbar() {
    return (
        <View style={styles.mainContainer}>
            <TextInput style = {styles.inputBox}
                placeholder = 'New affirmation' 
                placeholderTextColor="#868CA9"/>
        </View>
    );
}

const styles = StyleSheet.create({

    mainContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
  
    inputBox: {
      height: 50,
      width: '90%',
      marginVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderStyle: 'solid',
      borderColor: Colors.light.text,
      borderWidth: 1.5,
    },
});