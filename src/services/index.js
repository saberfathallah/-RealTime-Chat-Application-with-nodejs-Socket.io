import userServices from './userServices';
import invitationServices from './invitationServices';
import conversationServices from './conversationServices';

export default Object.assign(
  userServices,
  invitationServices,
  conversationServices
);
