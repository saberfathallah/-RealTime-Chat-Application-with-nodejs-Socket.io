import { Router } from 'express';
import handler from '../handlers/defaultHandler';
import { verifyToken } from '../utils/verifyToken';

const router = Router();

router.post('/signIn', (req, res) => handler({ req, res, root: 'signIn' }));
router.post('/signup', (req, res) => handler({ req, res, root: 'signUp' }));
router.get('/', verifyToken, (req, res) =>
  handler({ req, res, root: 'getAllUsers' })
);

export default router;
