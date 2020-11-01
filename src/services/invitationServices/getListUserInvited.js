import Invitation from '../../db/models/invitation';

const getListUserInvited = async (req) => {
  const userId = req.userId;

  try {
    const listUserInvited = await await Invitation.find({
      userSendInvitation: userId,
    }).populate('userSendInvitation');
    return {
      status: 200,
      listUserInvited,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
};

export default getListUserInvited;
