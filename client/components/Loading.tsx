import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

export default function LoadingScreen() {

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.light.yellow} />
      <ThemedText style={styles.text}>Did you know laughing can help reduce stress levels?</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Position it on top of the screen
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    zIndex: 9999, // Ensure it's above other elements
  },
  text: {
    marginTop: 20,
    fontSize: 14,
    fontStyle: 'italic',
    color: 'white',
  },
});