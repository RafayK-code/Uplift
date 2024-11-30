import { Image, StyleSheet, Platform, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

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
    <Button title="Login" onPress={handleLogin} />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
