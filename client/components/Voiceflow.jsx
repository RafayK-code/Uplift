import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Image } from 'react-native';
import { interact } from '@/hooks/useVoiceflow';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';

const VoiceflowButton = ({ setTimeDisplay, setMessageDisplay, onPressCb }) => {
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
        onPressCb(textResponse, new Date());
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
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 10,
    // marginLeft: "80%",
        // marginTop: '5%',
        position: 'absolute',
        top: '3%',
        left: '7%',
        zIndex: 1000,
        // backgroundColor: 'rgba(255, 255, 255, 0.5)', // Optional: Semi-transparent background
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
  },

  icon: {
    width: 40,
    height: 40
  },
});

export default VoiceflowButton;