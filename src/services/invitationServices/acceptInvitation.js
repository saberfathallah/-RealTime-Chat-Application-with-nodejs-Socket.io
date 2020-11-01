import Invitation from '../../db/models/invitation';
import validateUserId from '../../utils/validateUserId';
import { VALIDATED } from '../../constants/invitationsStatus';

async function acceptInvitation(req) {
  validateUserId(ctx);
  const { idInvited } = req.body;
  const { userid } = req.header;

  try {
    let inv = await Invitation.findOne({ idInvited: userid, id: idInvited });
    inv.status = VALIDATED;
    await inv.save();
    return;
    ctx.body = { success: 'success add friend ' };
    ctx.status = 200;
  } catch (err) {
    ctx.throw(500, err);
  }
  return ctx;
}

export default acceptInvitation;
