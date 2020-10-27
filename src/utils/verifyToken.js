import jwt from 'jsonwebtoken';

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, 'user secret key');
    return decoded.id;
  } catch (error) {
    return null;
  }
}

export default verifyToken;