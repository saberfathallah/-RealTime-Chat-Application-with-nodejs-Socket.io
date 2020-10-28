import User from '../../db/models/user';

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return {
      status: 200,
      users,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
};

export default getAllUsers;
