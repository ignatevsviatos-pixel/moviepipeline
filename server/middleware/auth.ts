import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({
			message: 'Не авторизован',
			});
		}

	try {
		const payload = jwt.verify(token, JWT_SECRET);
		if (typeof payload !== 'object' || !('userId' in payload) || (typeof payload.userId !== 'number')) {
			return res.status(401).json({
				message: 'Не авторизован',
			});
		}
		req.userId = payload.userId;
		next();
	} catch (error) {
		return res.status(401).json({
			message: 'Не авторизован',
		});
	}
};

export default authMiddleware;