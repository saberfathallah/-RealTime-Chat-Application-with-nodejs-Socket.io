import { Router } from 'express';
import handler from '../handlers/defaultHandler';

const router = Router();

router.post('/signIn', (req, res) => handler({ req, res, root: 'signIn' }));
router.post('/signup', (req, res) => handler({ req, res, root: 'signUp' }));
router.get('/', (req, res) => handler({ req, res, root: 'getAllUsers' }));

export default router;