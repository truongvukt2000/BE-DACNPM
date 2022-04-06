import axios from 'axios';

const googleAccountVerification = async (googleTokenId) => {
  try {
    const response = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${googleTokenId}`
    );
    const accountInformation = response.data;
    return accountInformation;
  } catch (error) {
    throw new Error(
      `There is a problem with Google authentication: ${error.response.data.error}`
    );
  }
};

export default googleAccountVerification;