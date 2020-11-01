import { getUserToken } from '../utils/verifyToken';
import Invitation from '../db/models/invitation';

const annulateInvitation = async (invitation, socket) => {
  const { idInvited, userToken } = invitation;
  const { firstName, lastName, id } = getUserToken(userToken);
  try {
    await Invitation.remove({
      idInvited: invitation.idInvited,
      userSendInvitation: id,
    });

    socket.to(idInvited).emit('reciveAnnulateInvitation', {
      firstName,
      lastName,
      idInvited: invitation.idInvited,
    });
  } catch (error) {
    console.log('errorsendInvitation', error);
  }
};

export default annulateInvitation;
