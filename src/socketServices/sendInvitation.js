import { getUserToken } from '../utils/verifyToken';
import { PENDING } from '../constants/invitationsStatus';
import Invitation from '../db/models/invitation';

const sendInvitation = async (invitation, socket) => {
  const { idInvited, userToken } = invitation;
  const { id, firstName, lastName, email } = getUserToken(userToken);
  try {
    await Invitation.create({
      idInvited: invitation.idInvited,
      status: PENDING,
      userSendInvitation: id,
    });
    socket.to(idInvited).emit('reciveInvitation', {
      userSendInvitation: { firstName, lastName, email, id },
      status: PENDING,
      idInvited: invitation.idInvited,
    });
  } catch (error) {
    console.log('errorsendInvitation', error);
  }
};

export default sendInvitation;
