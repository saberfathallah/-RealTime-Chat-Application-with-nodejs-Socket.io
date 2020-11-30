import mongoose from 'mongoose';

let conversationSchema = new mongoose.Schema({
  firstMember: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  secondMember: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  conversation: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

conversationSchema.toJSON = function () {
  return {
    id: this._id,
    firstMember: this.firstMember,
    secondMember: this.secondMember,
    conversation: this.conversation,
  };
};

export default mongoose.model('Conversation', conversationSchema);
