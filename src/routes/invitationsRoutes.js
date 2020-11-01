import { Router } from 'express';

import handler from '../handlers/defaultHandler';
import { verifyToken } from '../utils/verifyToken';

const router = Router();

router.get('/getAllInvitation', verifyToken, (req, res) =>
  handler({ req, res, root: 'getAllInvitation' })
);
router.get('/friends', verifyToken, (req, res) =>
  handler({ req, res, root: 'getFriendsList' })
);
router.get('/getListUserInvited', verifyToken, (req, res) =>
  handler({ req, res, root: 'getListUserInvited' })
);

export default router;
