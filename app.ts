import express from 'express';
// import postRoutes from './routes/postRoutes';
// import tagRoutes from './routes/tagRoutes';
import connectDB from './database/connect';

const app = express();
app.use(express.json());

// Connect to the database
// connectDB();

// Register routes
// app.use('/api/posts', postRoutes);
// app.use('/api/tags', tagRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
