import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}; 