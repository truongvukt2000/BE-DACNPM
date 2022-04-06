import User from '../model';
import parseErrorIntoMessage from '../../../helpers/parseErrorIntoMessage';

const register = async (req, res) => {
  const { email, password, fullname } = req.body;
  try {
    const userFoundByEmail = await User.findOne({ email, isDeleted: false });
    if (userFoundByEmail) {
      throw new Error('Existed email');
    }
    const user = new User({
      email,
      password,
      fullname,
    });
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send(parseErrorIntoMessage(error));
  }
};

export default register;
