import { Image, StyleSheet, Platform, SafeAreaView, View, Pressable, TextInput,} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

import { Button } from 'react-native';

import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    // Trigger the Auth0 login popup or redirect
    await loginWithRedirect();

    // After login, get the access token
    const token = await getAccessTokenSilently();
    console.log('Access Token:', token);
  };

  const getToken = async () => {
    const t = await getAccessTokenSilently();
    setToken(t);
    console.log(t);
  }

  useEffect(() => {
    getToken();
  }, [isAuthenticated])

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView/>
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo_small.png')}
            style={styles.upliftLogo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.loginContainer}>
          <TextInput 
            style = {styles.inputBox}
            placeholder = 'Username' 
            placeholderTextColor="#868CA9"
          />
          <TextInput 
            style = {styles.inputBox}
            secureTextEntry = {true}
            placeholder = 'Password' 
            placeholderTextColor="#868CA9"
          />
          
          <Pressable style={({ pressed }) => pressed ? styles.loginBtnPressed : styles.loginBtn} onPress={handleLogin}>
            <ThemedText style={styles.btnText}>Login</ThemedText>
          </Pressable>
          

        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginBottom: 10,
  },
  loginContainer: {
    flex: 0.5,
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10
  },
  upliftLogo: {
    width: 100,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
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
  }
});
