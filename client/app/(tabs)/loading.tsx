import { Image, StyleSheet, SafeAreaView, View, Pressable} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';


import { Colors } from '@/constants/Colors';
import { navigate } from 'expo-router/build/global-state/routing';

export default function LoadingScreen() {

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView/>
      
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
