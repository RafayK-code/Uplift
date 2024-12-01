import { Image, StyleSheet, SafeAreaView, View, Pressable} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';


import { Colors } from '@/constants/Colors';
import { navigate } from 'expo-router/build/global-state/routing';

export default function HomeScreen() {
  const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!isAuthenticated) {
      await loginWithRedirect();
      // Manually wait for authentication status to update.
      setTimeout(async () => {
      if (isAuthenticated) {
        router.push('/(tabs)/maindisplay');
        }
      }, 30); // Adjust delay if needed.
    return;

    }

    try {
      const token = await getAccessTokenSilently();
      setToken(token);
      console.log('Access Token:', token);
      router.push('/(tabs)/maindisplay');
    } catch (error) {
      console.error('Error during login:');
    }
  };

  const getToken = async () => {
    if (isAuthenticated) {
      const t = await getAccessTokenSilently();
      
      setToken(t);
      console.log(t);
    }
  }
  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        try {
          const t = await getAccessTokenSilently();
          setToken(t);
          console.log(t);
        } catch (error) {
          console.error('Error fetching token:');
        }
      }
    };

    fetchToken();
  }, [isAuthenticated, getAccessTokenSilently, navigate]);

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
          <Pressable style={styles.loginBtn} onPress={handleLogin}>
            <ThemedText style={styles.btnText}>→</ThemedText>
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
    marginBottom: '-40%'
  },
  upliftLogo: {
    width: 180,
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

  btnText: {
    color: 'white',
  },

  errorText: {
    color: 'red',
    marginTop: 10,
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
  padding: 50,
  marginBottom: '-10%'
}
});
