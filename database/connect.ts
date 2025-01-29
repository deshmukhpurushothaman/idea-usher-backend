import mongoose from 'mongoose';

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * The MongoDB URI is fetched from the environment variable `MONGODB_URI`.
 * If the environment variable is not set, it defaults to `'mongodb://localhost:27017/blog'`.
 *
 * The connection is asynchronous, and it will log a success message if connected successfully.
 * If an error occurs during the connection, it will log the error message and terminate the process with a non-zero exit code.
 *
 * @module database
 * @function connectDB
 *
 * @returns {Promise<void>} Resolves when the connection is established, or rejects if there is an error.
 * @throws {Error} If the connection fails, an error message is logged, and the process exits with status code 1.
 *
 * @example
 * // Usage in an Express app to connect to MongoDB:
 * connectDB();
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables or default URI
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/blog'
    );
    console.log('MongoDB connected successfully');
  } catch (error) {
    // If an error occurs, log the error and exit the process
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit with an error status
  }
};

export default connectDB;
