import Invitation from '../../db/models/invitation';
import { VALIDATED } from '../../constants/invitationsStatus';

const getFriendsList = async (req) => {
  const userId = req.userId;

  try {
    const friends = await Invitation.find({
      $or: [
        { userSendInvitation: userId, status: VALIDATED },
        { idInvited: userId, status: VALIDATED },
      ],
    })
      .populate('userSendInvitation')
      .populate('idInvited');

    const formatFriends = friends.map((friend) =>
      friend.idInvited._id.toString() === userId
        ? Object.assign(friend.userSendInvitation, {
            id: friend.userSendInvitation._id,
          })
        : Object.assign(friend.idInvited, { id: friend.idInvited._id })
    );

    return {
      status: 200,
      friends: formatFriends,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
};

export default getFriendsList;
