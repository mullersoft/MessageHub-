import express from 'express';
import * as authController from "../controllers/authController";
import * as categoryController from "../controllers/categoryController";
// import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();
// Route to create a new category
router.post(
  "/",
  // authMiddleware,
  categoryController.createCategory
);
// Route to get all categories
router.get("/",
    authController.protect,
    categoryController.getCategories);
// Route to get a specific category by ID
router.get("/:id", categoryController.getCategoryById);
// Route to update a category by ID
router.patch(
  "/:id",
  // authMiddleware,
  categoryController.updateCategory
);
// Route to delete a category by ID
router.delete(
  "/:id",
  // authMiddleware,
  categoryController.deleteCategory
);
export default router;
