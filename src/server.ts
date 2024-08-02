import mongoose from "mongoose";
import dotenv from "dotenv";

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.log("Uncaught exception --> Shutting down");
  console.log(err.name, err.message);
  process.exit(1); // Exit process with failure
});

// Load environment variables from config.env file
dotenv.config({ path: "./config.env" }); // Adjust the path if needed

import app from "./app";
// Connect to the MongoDB database
mongoose
  .connect(process.env.DATABASE_LOCAL as string)
  .then(() => console.log("DB connection successful!"));

// Define the port to listen on
const port: number = Number(process.env.PORT) || 3000;

// Start the server
const server = app.listen(port, () => {
  console.log(`App running on port ${port} -> ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.log("Unhandled rejection --> Shutting down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); // Exit process with failure
  });
});
