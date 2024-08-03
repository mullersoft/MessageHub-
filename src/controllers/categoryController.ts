import { Request, Response, NextFunction } from 'express';
import Category from '../models/categoryModel';
import catchAsync from '../utils/catchAsync';
import AppError from "../utils/appError";

// Create a new category
const createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.create(req.body);
    res.status(201).json({
        // result:length.category,
        status: "success",
        data: { category }
    });
});

// Get all categories
const getCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find();
    res.status(200).json({
        status: "success",
        data: { categories }
    });
});

// Get a category by ID
const getCategoryById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new AppError('Category not found', 404));
    }
    res.status(200).json({
        message: "success",
        data: { category }
    });
});

// Update a category by ID
const updateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
        return next(new AppError('Category not found', 404));
    }
    res.status(200).json({
        message: "success",
        data: { category }
    });
});

// Delete a category by ID
const deleteCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
        return next(new AppError('Category not found', 404));
    }
    res.status(204).json({ message: "success", data: null });
});

export { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };
