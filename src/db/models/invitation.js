import mongoose from 'mongoose';

let invitationSchema = new mongoose.Schema({
  idInvited: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userSendInvitation: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String },
});

invitationSchema.toJSON = function () {
  return {
    id: this._id,
    userSendInvitation: this.userSendInvitation,
    idInvited: this.idInvited,
    status: this.status,
  };
};

export default mongoose.model('Invitation', invitationSchema);