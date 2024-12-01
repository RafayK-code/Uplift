import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Image } from 'react-native';
import { interact } from '@/hooks/useVoiceflow';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';

const VoiceflowButton = ({ setTimeDisplay, setMessageDisplay }) => {
  const handleInteract = async () => {
    const user_id = 'jennifer.cao.ca@gmail.com';
    const request = { type: 'launch' };

    try {
      const result = await interact(user_id, request);

      // Extract text from the response payload
      const textResponse = result
        ?.find((item) => item.type === 'text')
        ?.payload?.slate?.content?.map((content) =>
          content.children?.map((child) => child.text).join('')
        )
        .join('');

      if (textResponse) {
        setTimeDisplay(new Date().toLocaleTimeString()); // Update time display
        setMessageDisplay(textResponse); // Update message display
      }
    } catch (err) {
      console.error(err.message || 'Unknown error');
    }
  };

  return (
    <Pressable
    style={styles.container}
    onPress={handleInteract}>
      <Image
          source={require('@/assets/images/tools.svg')}
          style={styles.icon}
          resizeMode="contain"
        />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  icon: {
    width: 50,
  },
});

export default VoiceflowButton;