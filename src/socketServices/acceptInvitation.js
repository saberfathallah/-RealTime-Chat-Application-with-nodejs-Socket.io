import { getUserToken } from '../utils/verifyToken';
import Invitation from '../db/models/invitation';
import { VALIDATED } from '../constants/invitationsStatus';

const acceptInvitation = async (invitation, socket) => {
  console.log('hereeeee');
  const { idSend, userToken } = invitation;
  const { firstName, lastName, id } = getUserToken(userToken);
  try {
    let inv = await Invitation.findOne({
      idInvited: id,
      userSendInvitation: idSend,
    });
    inv.status = VALIDATED;
    await inv.save();

    socket.to(idSend).emit('reciveAcceptInvitation', {
      user: {
        firstName,
        lastName,
        id: idSend,
      },
    });
  } catch (error) {
    console.log('errorsendInvitation', error);
  }
};

export default acceptInvitation;
