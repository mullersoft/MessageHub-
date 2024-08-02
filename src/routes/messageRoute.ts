import express from 'express';
import {
    createMessage,
    getMessages,
    getMessageById,
    // updateMessage,
    // deleteMessage
} from '../controllers/messageController';
// import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Route to create a new message
router.post('/',
    // authMiddleware,
    createMessage);

// Route to get all messages
router.get('/', getMessages);

// Route to get a specific message by ID
router.get('/:id', getMessageById);

// // Route to update a message by ID
// router.put('/:id', authMiddleware, updateMessage);

// // Route to delete a message by ID
// router.delete('/:id', authMiddleware, deleteMessage);

export default router;
