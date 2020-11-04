import { getUserToken } from '../utils/verifyToken';
import Invitation from '../db/models/invitation';
import { VALIDATED } from '../constants/invitationsStatus';

const removeFriend = async (removeFriendInput, socket) => {
  const { idFriend, userToken } = removeFriendInput;
  const { firstName, lastName, id } = getUserToken(userToken);

  try {
     await Invitation.remove({
      $or: [
        { userSendInvitation: idFriend,idInvited: id, status: VALIDATED },
        { idInvited: idFriend, userSendInvitation:id, status: VALIDATED },
      ],
    });

    socket.to(idFriend).emit('reciveRemoveFriend', {
      firstName,
      lastName,
      id,
    });
  } catch (error) {
    console.log('errorsendInvitation', error);
  }
};

export default removeFriend;