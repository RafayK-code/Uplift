import { useState } from 'react';
import axios from 'axios';

type VoiceflowResponse = {
  messages: string;
  error: string | null;
};

export const useVoiceflow = (projectID: string, apiKey: string) => {
  const [response, setResponse] = useState<VoiceflowResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const callVoiceflowAPI = async (): Promise<void> => {
    const endpoint = `https://general-runtime.voiceflow.com/state/${projectID}/interact`;

    setIsLoading(true);
    setError(null);

    try {
      const apiResponse = await axios.post(
        endpoint,
        { request: { type: 'launch' } }, // Launch request for the preset prompt
        { headers: { Authorization: apiKey } }
      );

      const messages = apiResponse.data
        .map((block: any) => block.text)
        .join('\n');
      setResponse({ messages, error: null });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message;
      setResponse({ messages: '', error: errorMessage });
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, error, callVoiceflowAPI };
};
