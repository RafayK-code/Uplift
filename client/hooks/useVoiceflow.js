import axios from 'axios';

const api_key = 'VF.DM.674b716c7151fc8271b56935.OEVIm53YymxOrPPl'; 

export const interact = async (user_id, request) => {
  try {
    const response = await axios.post(
      https://general-runtime.voiceflow.com/state/user/${user_id}/interact,
      { request },
      {
        headers: {
          Authorization: api_key,
          versionID: 'production',
          accept: 'application/json',
          'content-type': 'application/json',
        },
      }
    );

    console.log(response.data);
    return response.data; // Return the response to allow components to use it
  } catch (error) {
    console.error('Error interacting with Voiceflow:', error);
    throw error; // Throw the error so the caller can handle it
  }
};