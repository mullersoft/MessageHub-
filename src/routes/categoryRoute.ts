import express from 'express';
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController';
// import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();
// Route to create a new category
router.post('/',
    // authMiddleware,
    createCategory);
// Route to get all categories
router.get('/', getCategories);
// Route to get a specific category by ID
router.get('/:id', getCategoryById);
// Route to update a category by ID
router.patch('/:id',
    // authMiddleware,
    updateCategory);
// Route to delete a category by ID
router.delete('/:id',
    // authMiddleware,
    deleteCategory);
export default router;
