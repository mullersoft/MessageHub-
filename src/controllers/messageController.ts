import { Request, Response } from 'express';
import Message from '../models/messageModel';
import catchAsync from '../utils/catchAsync';

// // Create a new message
// const createMessage = async (req: Request, res: Response) => {
//     const { text, category } = req.body;
//     try {
//         const message = new Message({ text, category, user: req.userId });
//         await message.save();
//         res.status(201).json({ success: true, message });
//     } catch (error) {
//         res.status(500).json({ success: false, message: (error as Error).message });
//     }
// };

// Get all messages
const getMessages =  catchAsync(async (req: Request, res: Response) => {
        const messages = await Message.find();
        res.status(200).json({ status: 'success', data:{data:messages} });
});

// Get a message by ID
const getMessageById = async (req: Request, res: Response) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }
        res.status(200).json({ success: true, message });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

// Update a message by ID
const updateMessage = async (req: Request, res: Response) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }
        res.status(200).json({ success: true, message });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

// Delete a message by ID
const deleteMessage = async (req: Request, res: Response) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }
        res.status(200).json({ success: true, message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export {
    // createMessage,
    getMessages,
    getMessageById,
    updateMessage,
    deleteMessage
};
