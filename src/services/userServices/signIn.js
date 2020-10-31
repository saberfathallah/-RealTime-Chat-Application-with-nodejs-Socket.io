import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../../db/models/user';
import { USER_SECRET_KEY } from '../../constants/user';

const signIn = async (req) => {
  const { body: { email, password } } = req;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return {
        status: 400,
        message: 'Invalid password',
      };
    }

    const accessToken = await jwt.sign({ user }, USER_SECRET_KEY, { expiresIn: '1h' });

    return {
      status: 200,
      accessToken,
      user,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
};

export default signIn;
