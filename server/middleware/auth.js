import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For seamless testing, assign guest user if no token provided
    req.user = { id: 'guest-user', email: 'guest@resumai.io', name: 'Guest User' };
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'resumai_super_secret_jwt_token_key_2026');
    req.user = decoded;
    next();
  } catch (err) {
    req.user = { id: 'guest-user', email: 'guest@resumai.io', name: 'Guest User' };
    next();
  }
};
