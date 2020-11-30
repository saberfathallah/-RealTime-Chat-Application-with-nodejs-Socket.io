import Conversation from '../../db/models/conversation';

const getAllConversations = async (req) => {
  const { userId } = req;
  try {
    const conversations = await Conversation.find({
      $or: [{ firstMember: userId }, { secondMember: userId }],
    })
      .populate('firstMember')
      .populate('secondMember')
      .populate({
        path: 'conversation.user',
      });

    const formatConversations = conversations.map((conversation) =>
      conversation.firstMember._id.toString() === userId
        ? Object.assign(
            { user: conversation.secondMember },
            {
              conversation: conversation.conversation.map((c, i) => {
                return {
                  _id: i,
                  text: c.text,
                  createdAt: c.createdAt,
                  user: {
                    _id: c.user.id,
                    name: c.user.firstName,
                    avatar: 'https://facebook.github.io/react/img/logo_og.png',
                  },
                };
              }),
            }
          )
        : Object.assign(
            { user: conversation.firstMember },
            {
              conversation: conversation.conversation.map((c, i) => {
                return {
                  _id: i,
                  text: c.text,
                  createdAt: c.createdAt,
                  user: {
                    _id: c.user.id,
                    name: c.user.firstName,
                    avatar: 'https://facebook.github.io/react/img/logo_og.png',
                  },
                };
              }),
            }
          )
    );

    return {
      status: 200,
      conversations: formatConversations,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
};

export default getAllConversations;
