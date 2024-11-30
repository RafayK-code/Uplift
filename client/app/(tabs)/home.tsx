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
            <View style={styles.affirmation}></View>
            <View style={StyleSheet.compose(styles.affirmation, {top: height * 0.3, left: width * 0.8})}>
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
      color: '#FFFFFF',
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
      width: '81%', // 50% of the screen width
      height: '18%', // 20% of the screen height
      top: height * 0.3, // 30% down from the top of the screen
      right: width * 0.05, // 25% from the left
      backgroundColor: '#000000', // Background color
      justifyContent: 'center', // Align text vertically
      alignItems: 'center', // Align text horizontally
      borderRadius: 10, // Optional: rounded corners
>>>>>>> 870a7e244a9722cf3f8e0ffcef32bbd935c2d228
    }
});
