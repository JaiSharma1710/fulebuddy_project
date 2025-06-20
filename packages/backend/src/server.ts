import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;


app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- AUTH ROUTES ---
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

app.post('/api/auth/signup', async (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) return res.status(400).json({ message: 'All fields required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'User already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, name, password: hash });
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.json({ id: user._id, email: user.email, name: user.name });
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.json({ id: user._id, email: user.email, name: user.name });
});

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
});

app.get('/api/auth/me', (req, res) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });
    try {
        const user = jwt.verify(token, JWT_SECRET);
        res.json(user);
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
});
// --- END AUTH ROUTES ---

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fulebuddy';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Backend server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Connection error', err.message);
    }); 