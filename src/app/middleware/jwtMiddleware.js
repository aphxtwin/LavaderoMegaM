import jwt from "jsonwebtoken";

export async function verifyJWT(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, 'secret-key');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

app.use('/api/users', verifyJWT, protectedRouter);