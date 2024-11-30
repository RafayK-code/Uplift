import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Image, StyleSheet, SafeAreaView, View, TextInput, Pressable } from 'react-native'

import { Colors } from '@/constants/Colors';
 
export default function login() {
    return (
        <ThemedView style={{ flex: 1 }}>
            <SafeAreaView/>
            
            <View style={styles.mainContainer}>
                <View style={styles.loginContainer}>

                <View style={styles.titleContainer}>
                <Image
                    source={require('@/assets/images/logo_small.png')}
                    style={styles.upliftLogo}
                    resizeMode="contain"
                    />
                </View>

                {/* <View style={styles.titleContainer}>
                    <ThemedText>Uplift</ThemedText>
                </View> */}

                <TextInput style = {styles.inputBox}
                placeholder = 'Username' 
                placeholderTextColor="#868CA9"/>

                <TextInput style = {styles.inputBox}
                secureTextEntry = {true}
                placeholder = 'Password' 
                placeholderTextColor="#868CA9"/>

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
  logoContainer1: {
    marginBottom: 20,
},
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
    },
  
    inputBox: {
      height: 50,
      width: '100%',
      marginVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 50,
      backgroundColor: Colors.light.background,
      borderStyle: 'solid',
      borderColor: Colors.light.lightgrey,
      borderWidth: 1.5,
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
      backgroundColor: Colors.light.pink
    },

    btnText: {
      color: 'white',
    },

    errorText: {
      color: 'red',
      marginTop: 10,
    },

    upliftLogo: {
      width: 80,
  },
});
