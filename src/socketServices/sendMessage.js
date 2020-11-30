import { getUserToken } from '../utils/verifyToken';
import Conversation from '../db/models/conversation';

const sendMessage = async (message, socket) => {
  const { userId, text, userToken, createdAt } = message;
  const { firstName, lastName, id } = getUserToken(userToken);
  let coversation;
  try {
    const conversationRespoonse = await Conversation.findOne({
      $or: [
        { firstMember: userId, secondMember: id },
        { firstMember: id, secondMember: userId },
      ],
    });
    if (conversationRespoonse) {
      coversation = conversationRespoonse;
    } else {
      coversation = await Conversation.create({
        firstMember: id,
        secondMember: userId,
        conversation: [],
      });
    }
    const createdAt = new Date();
    coversation.conversation.push({
      user: id,
      text,
      createdAt,
    });

    await coversation.save();

    socket
      .to(userId)
      .emit('reciveMessage', { firstName, lastName, text, id, createdAt });
  } catch (error) {
    console.log('errorsendInvitation', error);
  }
};

export default sendMessage;
