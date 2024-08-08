import express, { Request, Response, NextFunction } from "express";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";
// import rateLimiter from "express-rate-limit";
// import morgan from "morgan";
// import helmet from "helmet";
// import mongoSanitize from "express-mongo-sanitize";
// import xss from "xss-clean";
// import hpp from "hpp";
// import eventRoute from "./routes/eventRoute";
import messageRouter from "./routes/messageRoute";
import categoryRouter from "./routes/categoryRoute"; ;
import userRouter from "./routes/userRoute";



const app = express();

// 1) Global Middleware

// Set security HTTP headers
// app.use(helmet());

// // Development logging
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// Limit requests from the same API
// const limiter = rateLimiter({
//   max: 100, // Maximum number of requests
//   windowMs: 60 * 60 * 1000, // 1 hour window
//   message: "Too many requests from this IP, please try again in an hour",
// });
// app.use("/api", limiter);

// Body-parser: reading data from body into req.body
// Middleware to parse JSON bodies
app.use(express.json({ limit: "10kb" }));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// Data sanitization against XSS attacks
// app.use(xss());

// Prevent parameter pollution
// app.use(hpp({ whitelist: ["duration"] }));

// 2) Routes
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", userRouter);
// Handling unhandled routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

// Export the app for use in other files
export default app;
