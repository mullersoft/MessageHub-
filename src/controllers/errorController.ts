import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import { Error as MongooseError } from "mongoose";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

/**
 * Handles Mongoose validation errors.
 * @param err - The error object.
 * @returns The formatted AppError object.
 */
const handleValidationErrorDB = (
  err: MongooseError.ValidationError
): AppError => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = (err: JsonWebTokenError): AppError => {
  return new AppError("Invalid token. Please log in again.", 401);
};


const handleJWTExpiredError = (err: TokenExpiredError): AppError => {
  return new AppError("Your token has expired! Please log in again.", 401);
};


const handleCastErrorDB = (err: MongooseError.CastError): AppError => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};


const handleDuplicateFieldsDB = (err: MongooseError): AppError => {
  // Extracting the duplicate field value
  const value = err.message.match(/(["'])(\\?.)*?\1/);
  const fieldValue = value ? value[0] : "unknown value";
  const message = `Duplicate field value: ${fieldValue}. Please use another value!`;
  return new AppError(message, 400);
};



const sendErrorDev = (err: AppError, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};


const sendErrorProd = (err: AppError, res: Response): void => {
  if (err.isOperational) {
    // Operational, trusted error: send message to client
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown error: do not leak error details
    // 1) Log error
    console.error("ERROR", err);
    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};


const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err, message: err.message };

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError")
      error = handleJWTExpiredError(error);

    sendErrorProd(error, res);
  }
};

export default globalErrorHandler;
