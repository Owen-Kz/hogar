const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const streamifier = require("streamifier");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Use memory storage instead of disk storage
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory instead of disk
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

const uploadProduct = (req, res) => {
  if (req.cookies._t && req.cookies._usid) {
    upload.fields([{ name: 'product-images[]', maxCount: 10 }])(req, res, async (err) => {
      if (err) {
        console.error('Error during file upload:', err);
        return res.status(500).json({ error: 'File upload failed' });
      }

      try {
        const imageFiles = req.files['product-images[]'] || [];

        // Upload file to Cloudinary directly from memory
        const uploadToCloudinary = async (file) => {
          return new Promise((resolve, reject) => {
            let uploadOptions = {};

            // Check if the file is a video
            if (file.mimetype.startsWith('video/')) {
              uploadOptions.resource_type = 'video';
            }

            const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
              if (error) {
                console.error('Upload to Cloudinary failed:', error);
                return reject(`Failed to upload ${file.originalname}.`);
              }
              resolve(result.url);
            });

            streamifier.createReadStream(file.buffer).pipe(uploadStream);
          });
        };

        // Process all files
        const uploadedImageUrls = await Promise.all(imageFiles.map(uploadToCloudinary));

        // Send Data to backend for processing
        const { title, description, price, category } = req.body;
        const data = {
          title,
          description,
          price,
          category,
          imageFiles: uploadedImageUrls,
        };

        const response = await fetch(`${process.env.ENDPOINT}/y/uploadProduct`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (responseData.success) {
          return res.json({ success: responseData.success });
        } else {
          return res.json({ error: responseData.error });
        }
      } catch (error) {
        console.error(error);
        return res.json({ error: error.message });
      }
    });
  } else {
    return res.json({ error: "User not Logged In" });
  }
};

module.exports = uploadProduct;
