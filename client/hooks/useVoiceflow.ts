import { useState } from 'react';
import axios from 'axios';

type VoiceflowResponse = {
  data: string | null;
  error: string | null;
  isLoading: boolean;
};

export const useVoiceflow = (projectID: string, apiKey: string) => {

  const endpoint = `https://general-runtime.voiceflow.com/state/${projectID}/interact`;

  const [response, setResponse] = useState<VoiceflowResponse>({
    data: null,
    error: null,
    isLoading: false,
  });

  const fetchResponse = async (): Promise<void> => {
    setResponse({ data: null, error: null, isLoading: true });

    try {
      const result = await axios.post(
        endpoint,
        { request: { type: 'launch' } }, 
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setResponse({ data: result.data, error: null, isLoading: false });
    } catch (error: any) {
      console.error('Error:', error.response?.data || error.message);
      setResponse({
        data: null,
        error: error.response?.data || error.message || 'Unknown error',
        isLoading: false,
      });
    }
  };

  return { ...response, fetchResponse };
};
