import express from 'express';
import * as authController from "../controllers/authController";
import {
    createMessage,
    getMessages,
    getMessageById,
    updateMessage,
    deleteMessage
} from '../controllers/messageController';
// import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Route to create a new message
router.post('/',
    // authMiddleware,
    createMessage);
// Route to get all messages
router.get("/", authController.protect, getMessages);
// Route to get a specific message by ID
router.get('/:id', getMessageById);
// Route to update a message by ID
router.patch('/:id',
    // authMiddleware,
    updateMessage);
// Route to delete a message by ID
router.delete('/:id',
    // authMiddleware,
    deleteMessage);

export default router;
