import { Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });
        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, message: (error as Error).message });
    }
};

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, message: (error as Error).message });
    }
};

export { registerUser, loginUser };
