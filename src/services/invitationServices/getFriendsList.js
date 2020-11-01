import Invitation from '../../db/models/invitation';
import { VALIDATED } from '../../constants/invitationsStatus';

const getFriendsList = async (req) => {
  const userId = req.userId;

  try {
    const friends = await Invitation.find({
      $or: [
        { id: userId, status: VALIDATED },
        { idInvited: userId, status: VALIDATED },
      ],
    });

    return {
      status: 200,
      friends,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
};

export default getFriendsList;
