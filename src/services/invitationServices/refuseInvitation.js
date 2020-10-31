import Invitation from '../../db/models/invitation';

async function refuseInvitation(req) {
  const userId = req.userId;
  const userId = req.params.idUserSentInvitation;

  try {
    await Invitation.remove({
      id: idUserSentInvitation,
      idInvited: userId,
    });
    return {
      status: 200,
      invitations,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
}

export default refuseInvitation;
