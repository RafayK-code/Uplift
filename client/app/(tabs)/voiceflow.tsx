import React from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useVoiceflow } from '@/hooks/useVoiceflow'; // adjust the import path as needed

const VoiceflowComponent: React.FC = () => {
  const { data, error, isLoading, fetchResponse } = useVoiceflow(
    '674b6ff65fb5e8ee3f812998', // proj ID
    'VF.DM.674b716c7151fc8271b56935.OEVIm53YymxOrPPl' // API key
  );

  return (
    <View style={{ padding: 20 }}>
      <Button title="Fetch Voiceflow Response" onPress={fetchResponse} />

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && (
        <Text style={{ color: 'red', marginTop: 10 }}>
          {typeof error === 'object' ? JSON.stringify(error) : error}
        </Text>
      )}
      {data && (
        <Text style={{ marginTop: 10 }}>
          {typeof data === 'object' ? JSON.stringify(data) : data}
        </Text>
      )}
    </View>
  );
};

export default VoiceflowComponent;
