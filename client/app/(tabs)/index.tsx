import { Image, StyleSheet, Platform, SafeAreaView, View, Pressable, TextInput,} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

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
      <LinearGradient
      colors={['#FFF', '#B2E3FA', '#FFF186']} // Gradient colors
      locations={[0.3831, 0.7473, 1]} // Corresponding positions as decimals
      style={styles.gradientBackground} // Apply gradient as background
    >
      
      
        <View style={styles.logos}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo_colour.png')}
            style={styles.upliftLogo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo_colour.png')}
            style={[styles.upliftLogo, { opacity: 0.35 }]}
            resizeMode="contain"
          />
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo_colour.png')}
            style={[styles.upliftLogo, { opacity: 0.1 }]}
            resizeMode="contain"
          />
        </View>
        </View>
        <View style={styles.caption}>
        <ThemedText style={styles.message}>Empowering words to brighten your day, one affirmation at a time</ThemedText>
        </View>
        <View style={styles.loginContainer}>
          <Pressable style={({ pressed }) => pressed ? styles.loginBtnPressed : styles.loginBtn} onPress={handleLogin}>
            <ThemedText style={styles.btnText}>Begin →</ThemedText>
          </Pressable>
          

        </View>
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginBottom: 5,
  },
  loginContainer: {
    flex: 0.5,
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    marginBottom: "-40%"
  },
  upliftLogo: {
    width: 180,
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
    borderRadius: 8,
    width: '100%',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.text
  },

  loginBtnPressed: {
    height: 50,
    borderRadius: 8,
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
  backgroundCircle: {
    position: 'absolute',
    width: '140%', // Make the circle larger than the screen
    aspectRatio: 1, // Ensures it stays a perfect circle
    borderRadius: 500, // Rounds the edges fully to make it circular
    // marginTop: 95,
    top: '-15%', // Adjust vertical position (negative pushes it up)
    left: '-25%', // Center it horizontally
    zIndex: -1, // Push it behind other elements
},
gradientBackground: {
  flex: 1, // Take up the full screen height
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
},
logos: {
  flex: 1, // Take up the full screen height
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: 75
},
message: {
  textAlign: 'center',
  fontSize: 14,
  fontStyle: 'italic'
},
caption: {
  textAlign: 'center',
  padding: 20,
  marginBottom: '-10%'
}
});
