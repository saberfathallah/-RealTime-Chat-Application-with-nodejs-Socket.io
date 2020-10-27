import { Router } from 'express';
import handler from '../handlers/defaultHandler';

const router = Router();
//  verify token = midleware
// handler fonction générique pour retourner le status, data ou error pour chaque services
// verifyToken c'est un middleware si utilisateur connecter va executer la fonction handler si non va
// retourner message: 'Failed to authenticate, please update your token.',

router.post('/signIn', (req, res) => handler({ req, res, root: 'signIn' }));
router.post('/signup', (req, res) => handler({ req, res, root: 'signUp' }));

export default router;