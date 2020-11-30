import userRoutes from './routes/userRoutes';
import invitationRoutes from './routes/invitationsRoutes';
import conversationRoutes from './routes/conversationRoutes';

export default (app) => {
  app.use('/users', userRoutes);
  app.use('/invitations', invitationRoutes);
  app.use('/conversations', conversationRoutes);
};
