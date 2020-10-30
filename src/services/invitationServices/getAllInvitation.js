import Invitation from '../../db/models/invitation';
import { PENDING } from '../../constants/invitationsStatus';

const getAllInvitation = async (req) => {
  const userId = req.userId;

  try {
    const invitations = await Invitation.find({ idInvited: userId, status: PENDING }).populate("idInvited");

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
};

export default getAllInvitation;