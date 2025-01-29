import multer from 'multer';

/**
 * Configure Multer to use memory storage and handle image uploads.
 * - Limits file size to 5 MB.
 * - Only allows image files (e.g., JPEG, PNG, GIF, etc.).
 *
 * @module fileUpload
 */

// Memory storage setup for storing files in memory as buffers
const storage = multer.memoryStorage();

/**
 * The Multer middleware configuration for handling file uploads.
 * - Limits file size to 5 MB.
 * - Only accepts image files (MIME type starts with 'image/').
 *
 * @constant
 * @type {multer.Instance}
 */
const upload = multer({
  storage, // Use memory storage
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
  },
  /**
   * File filter function that checks if the uploaded file is an image.
   *
   * @param {Express.Request} req - The incoming request.
   * @param {Express.Multer.File} file - The file to be uploaded.
   * @param {Function} cb - The callback function to indicate whether to accept or reject the file.
   *
   * @returns {void} - Calls the callback function with `null` for acceptance or an error for rejection.
   */
  fileFilter: (req, file, cb) => {
    // Check if the file's MIME type starts with 'image/'
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type. Only images are allowed.')); // Reject the file
    }
  },
});

/**
 * Middleware function to handle single image file uploads.
 * This will parse the uploaded file, store it in memory, and make it accessible through `req.file`.
 *
 * @function uploadSingleImage
 * @param {Express.Request} req - The request object containing the file in `req.file`.
 * @param {Express.Response} res - The response object to handle success or error.
 * @param {Express.NextFunction} next - The next middleware function to be called if the file upload is successful.
 * @returns {void} - Calls the `next()` function to pass control to the next middleware after successful upload.
 */
export const uploadSingleImage = upload.single('image');
