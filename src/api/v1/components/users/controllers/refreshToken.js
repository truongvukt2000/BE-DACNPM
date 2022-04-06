import User from '../model';
import jwt from 'jsonwebtoken';
import parseErrorIntoMessage from '../../../helpers/parseErrorIntoMessage';

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies[process.env.REFRESH_TOKEN_KEY];

  try {
    if (!refreshToken) {
      throw new Error("You're not authenticated");
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        console.log(error);
      }

      const { accessToken, refreshToken } = User.generateToken(user.data);
      res.cookie(process.env.REFRESH_TOKEN_KEY, refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      res.status(200).send({
        accessToken: accessToken,
      });

    });
  } catch (error) {
    res.status(400).send(parseErrorIntoMessage(error));
  }
};

export default refreshToken;