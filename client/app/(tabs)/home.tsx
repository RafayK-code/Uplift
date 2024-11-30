import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, SafeAreaView, View, TextInput, Pressable } from 'react-native'
// import LinearGradient from 'react-native-linear-gradient';

import { Colors } from '@/constants/Colors';
 
export default function home() {
    return (
        <ThemedView style={{ flex: 1 }}>
            <SafeAreaView/>
            
            <View style={styles.mainContainer}>
            {/* <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{flex: 1}}
    >
      <ThemedText>Hello, Gradient!</ThemedText>
    </LinearGradient> */}
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
