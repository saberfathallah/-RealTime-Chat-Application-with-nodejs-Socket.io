
import userRoutes from './routes/userRoutes';

export default (app) => {
  app.use('/users', userRoutes);
};