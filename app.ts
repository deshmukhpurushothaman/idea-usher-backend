import express from 'express';
import postRoutes from './routes/post.route';
import tagRoutes from './routes/tag.route';
import connectDB from './database/connect';

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to the MongoDB database
connectDB();

/**
 * Registers routes for the application.
 *
 * @description
 * The routes for posts and tags are registered under the `/api/posts` and `/api/tags` endpoints respectively.
 * - `POST /api/posts` - Create a new post.
 * - `GET /api/posts` - Fetch all posts.
 * - `GET /api/posts/:id` - Fetch a specific post by ID.
 * - `PUT /api/posts/:id` - Update a post by ID.
 * - `DELETE /api/posts/:id` - Delete a post by ID.
 * - `POST /api/tags` - Create a new tag.
 * - `GET /api/tags` - Fetch all tags.
 * - `GET /api/tags/:id` - Fetch a specific tag by ID.
 * - `PUT /api/tags/:id` - Update a tag by ID.
 * - `DELETE /api/tags/:id` - Delete a tag by ID.
 */
app.use('/api/posts', postRoutes);
app.use('/api/tags', tagRoutes);

// Set the port for the server to listen on
const PORT = process.env.PORT || 8000;

/**
 * Start the Express server on the specified port.
 *
 * @description
 * The server will listen on the specified port, which is either the one provided by the environment variable `PORT`
 * or defaults to 8000 if not set.
 *
 * @example
 * // Starting the server on port 8000
 * app.listen(PORT, () => {
 *   console.log(`Server is running on port ${PORT}`);
 * });
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
