import User from '../model';

import parseErrorIntoMessage from '../../../helpers/parseErrorIntoMessage';
import facebookAccountVerification from '../helpers/facebookAccountVerification';

const loginFacebook = async (req, res) => {
  const { accessToken } = req.body;

  try {
    if (!accessToken) {
      throw new Error('Invalid information');
    }

    const facebookAccount = await facebookAccountVerification(accessToken);
    const { id: facebookId, name } = facebookAccount;
    const userFoundByFacebookId = await User.findOne({ facebookId, isDeleted: false });
    if (userFoundByFacebookId) {
      const { accessToken, refreshToken } = User.generateToken(userFoundByFacebookId);
      res.cookie(process.env.REFRESH_TOKEN_KEY, refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      res.status(200).json({
        "user": userFoundByFacebookId,
        "accessToken": accessToken,
      });
    }
    else {
      const user = new User({
        fullname: name,
        facebookId,
        isVerified: true,
      });
      const savedUser = await user.save();

      const { accessToken, refreshToken } = User.generateToken(savedUser);
      res.cookie(process.env.REFRESH_TOKEN_KEY, refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      res.status(201).send({
        "user": savedUser,
        "accessToken": accessToken,
      });
    }
  } catch (error) {
    res.status(400).send(parseErrorIntoMessage(error));
  }
};

export default loginFacebook;
