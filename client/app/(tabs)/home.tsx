import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, SafeAreaView, View, TextInput, Pressable } from 'react-native'


import MainDisplay from './maindisplay';

import { Colors } from '@/constants/Colors';

export default function home() {
    return (
        <ThemedView style={{ flex: 1 }}>
            <SafeAreaView/>
            
<<<<<<< HEAD
            {/*
                        <LinearGradient
          colors={['red', 'yellow', 'green' ]}
          style={styles.linearGradient}
        >
          <ThemedText>Vertical Gradient</ThemedText>
        </LinearGradient>
             */}
            <View style={styles.mainContainer}>
            
            <MainDisplay/>
=======
            <View style={styles.mainContainer}>
            <View style={styles.affirmation}>
              </View>
>>>>>>> 870a7e244a9722cf3f8e0ffcef32bbd935c2d228
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
  
<<<<<<< HEAD
    loginContainer: {
      flex: 0.5,
      width: '90%',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 10
    },
  
    titleContainer: {
      flex: 2,
      width: '60%',
      marginBottom: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'grey'
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: 200,
        width: 350,
      },
  
    inputBox: {
      height: 50,
      width: '100%',
      marginVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 50,
      backgroundColor: Colors.light.text,
    },
  
    loginBtn: {
      height: 50,
      borderRadius: 50,
      width: '100%',
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.light.text
    },

    loginBtnPressed: {
      height: 50,
      borderRadius: 50,
      width: '100%',
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.light.text
    },

    btnText: {
      color: 'white',
    },

    errorText: {
      color: 'red',
      marginTop: 10,
=======
    affirmation: {
      width: '6%', // 50% of the screen width
      height: '20%', // 20% of the screen height
      backgroundColor: '#4c669f', // Background color
      justifyContent: 'center', // Align text vertically
      alignItems: 'center', // Align text horizontally
      borderRadius: 10, // Optional: rounded corners
>>>>>>> 870a7e244a9722cf3f8e0ffcef32bbd935c2d228
    }
});
