import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import APIFeatures from "../utils/apiFeatures";

/**
 * Factory function to delete a document by ID.
 * @param Model - Mongoose model.
 * @returns Express middleware function.
 */
export const deleteOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

/**
 * Factory function to update a document by ID.
 * @param Model - Mongoose model.
 * @returns Express middleware function.
 */
export const updateOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No document found with that ID!", 404));
    }
    res.status(200).json({
      status: "success",
      data: { data: doc },
    });
  });

/**
 * Factory function to create a new document.
 * @param Model - Mongoose model.
 * @returns Express middleware function.
 */
export const createOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: { doc },
    });
  });

/**
 * Factory function to get a single document by ID.
 * @param Model - Mongoose model.
 * @param popOptions - Optional populate options for the query.
 * @returns Express middleware function.
 */
export const getOne = (Model: any, popOptions?: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError("No document found with that ID!", 404));
    }
    res.status(200).json({
      status: "success",
      data: { data: doc },
    });
  });

/**
 * Factory function to get all documents with optional filtering, sorting, limiting fields, and pagination.
 * @param Model - Mongoose model.
 * @returns Express middleware function.
 */
export const getAll = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let filter = {};
    if (req.params.eventId) filter = { event: req.params.eventId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: "success",
      result: doc.length,
      data: { data: doc },
    });
  });
