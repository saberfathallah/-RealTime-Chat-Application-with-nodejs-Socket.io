import { Router } from 'express';

import handler from '../handlers/defaultHandler';
import { verifyToken } from '../utils/verifyToken';

const router = Router();

router.get('/', verifyToken, (req, res) =>
  handler({ req, res, root: 'getAllConversations' })
);

export default router;
