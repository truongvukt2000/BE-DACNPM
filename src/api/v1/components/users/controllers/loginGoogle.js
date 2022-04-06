import User from '../model';
import parseErrorIntoMessage from '../../../helpers/parseErrorIntoMessage';
import googleAccountVerification from '../helpers/googleAccountVerification';
import generateUUID from '../../../helpers/generateUUID';

const loginGoogle = async (req, res) => {
  const { tokenId } = req.body;
  try {
    if (!tokenId) {
      throw new Error('Invalid information');
    }
    const googleAccountInformation = await googleAccountVerification(tokenId);
    const { email, sub: googleId, name: fullname } = googleAccountInformation;
    const password = generateUUID(32);
    const userFoundByEmail = await User.findOne({ email, isDeleted: false });
    if (userFoundByEmail) {
      const {accessToken, refreshToken} = User.generateToken(userFoundByEmail);
      res.cookie(process.env.REFRESH_TOKEN_KEY, refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      res.status(200).send({
        "user": userFoundByEmail ,
        "accessToken": accessToken,
      });
    }
    
    const user = new User({
      email,
      password,
      fullname,
      googleId,
      isVerified: true,
    });
    const savedUser = await user.save();

    const {accessToken, refreshToken} = User.generateToken(savedUser);
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
  } catch (error) {
    res.status(400).send(parseErrorIntoMessage(error));
  }
};

export default loginGoogle;
