import jwt from 'jsonwebtoken';
import { USER_SECRET_KEY } from '../constants/user';

export function getUserToken(token) {
  try {
    const decoded = jwt.verify(token, USER_SECRET_KEY);
  
    return decoded.user;
  } catch (error) {
    return null;
  }
}

export default verifyToken;

export const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;

    if (accessToken) {
      const { id: userId} = await getUserToken(accessToken);
      if (!userId) {
        return res.status(401).send({
          message: 'Failed to authenticate, please update your token.',
        });
      }
      req.userId = userId;
      next();
      return null;
    }
    return res.status(403).send({
      message: 'No token provided.',
    });
  } catch (err) {
    return res.status(500).send({
      error: err,
    });
  }
};
