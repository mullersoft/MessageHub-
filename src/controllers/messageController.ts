import { Request, Response, NextFunction } from 'express';
import Message from '../models/messageModel';
import catchAsync from '../utils/catchAsync';
import AppError from "../utils/appError";
// Create a new message
const createMessage = catchAsync(async  (req: Request, res: Response) => {
    const message = await Message.create(req.body);
    res.status(201).json({
      status: "success",
      data: { message },
    });
  });
// Get all messages
const getMessages =  catchAsync(async (req: Request, res: Response) => {
        const messages = await Message.find();
    res.status(200).json({
        status: 'success',
        results: messages.length,
        data: { data: messages }
    });
});
// Get a message by ID
const getMessageById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const message = await Message.findById(req.params.id);
    if (!message) {
        return next(new AppError('Message not found', 404));
    }
    res.status(200).json({ message: "success",data: {message} });
});

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
    createMessage,
    getMessages,
    getMessageById,
    updateMessage,
    deleteMessage
};
