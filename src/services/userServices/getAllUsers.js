import User from '../../db/models/user';

const getAllUsers = async (req) => {
  const userId = req.userId;

  try {
    const users = await User.find({ _id: { $ne: userId } });
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
