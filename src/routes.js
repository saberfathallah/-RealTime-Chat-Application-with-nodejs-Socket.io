import userRoutes from './routes/userRoutes';
import invitationRoutes from './routes/invitationsRoutes';

export default (app) => {
  app.use('/users', userRoutes);
  app.use('/invitations', invitationRoutes);
};