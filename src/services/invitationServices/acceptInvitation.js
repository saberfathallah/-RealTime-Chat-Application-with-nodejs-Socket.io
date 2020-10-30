
import Invitation from '../../db/models/invitation';
import validateUserId from '../../utils/validateUserId';

async function acceptInvitation(req) {
  validateUserId(ctx);
  const { idInvited } = req.body;
  const { userid } = req.header;

  try {
    let inv = await Invitation.findOne({ idInvited: userid, id: idInvited });
    inv.status = 'valid';
    await inv.save();
    return 
    ctx.body = { success: 'success add friend ' };
    ctx.status = 200;
  } catch (err) {
    ctx.throw(500, err);
  }
  return ctx;
}

export default acceptInvitation;