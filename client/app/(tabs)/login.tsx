import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, SafeAreaView, View, TextInput, Pressable } from 'react-native'

import { Colors } from '@/constants/Colors';
 
export default function login() {
    return (
        <ThemedView style={{ flex: 1 }}>
            <SafeAreaView/>
            
            <View style={styles.mainContainer}>
                <View style={styles.loginContainer}>

                <View style={styles.titleContainer}>
                    <ThemedText>LOGO</ThemedText>
                </View>

                <TextInput style = {styles.inputBox}
                placeholder = 'Username or Email' />

                <TextInput style = {styles.inputBox}
                secureTextEntry = {true}
                placeholder = 'Password' />

                <Pressable 
                style={({ pressed }) =>
                pressed ? styles.loginBtnPressed : styles.loginBtn}
                >
                    <ThemedText style={styles.btnText}>Login</ThemedText>
                </Pressable>

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
  
    inputBox: {
      height: 50,
      width: '100%',
      marginVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 50,
      backgroundColor: Colors.light.icon,
    },
  
    loginBtn: {
      height: 50,
      borderRadius: 50,
      width: '100%',
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.light.tint
    },

    loginBtnPressed: {
      height: 50,
      borderRadius: 50,
      width: '100%',
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.light.icon
    },

    btnText: {
      color: 'white',
    },

    errorText: {
      color: 'red',
      marginTop: 10,
    }
});
