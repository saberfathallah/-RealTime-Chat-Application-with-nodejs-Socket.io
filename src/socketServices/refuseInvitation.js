import { getUserToken } from '../utils/verifyToken';
import Invitation from '../db/models/invitation';

const refuseInvitation = async (invitation, socket) => {
  const { idSend, userToken } = invitation;
  const { firstName, lastName, id } = getUserToken(userToken);
  try {
    await Invitation.remove({
      idInvited: id,
      userSendInvitation: idSend,
    });

    socket.to(idSend).emit('reciveRefuseInvitation', {
      user: {
        firstName,
        lastName,
        idSend,
      },
      idInvited: id,
    });
  } catch (error) {
    console.log('errorsendInvitation', error);
  }
};

export default refuseInvitation;
