import axios from 'axios';

const facebookAccountVerification = async (accessToken) => {
  try {
    let urlGraphFacebook = `https://graph.facebook.com/v13.0/me/?fields=id,name,email&access_token=${accessToken}`
    const response = await axios.get(urlGraphFacebook);
    const accountInformation = response.data;

    return accountInformation;
  } catch (error) {
    throw new Error(
      `There is a problem with Facebook authentication: ${error.response.data.error}`
    );
  }
};

export default facebookAccountVerification;
