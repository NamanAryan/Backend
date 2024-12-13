import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,  // Note: You have CLOUD_KEY but it should be API_KEY
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        // Add logging to verify file exists
        if (!fs.existsSync(localFilePath)) {
            console.error("File not found at path:", localFilePath);
            return null;
        }

        // Log Cloudinary config (without sensitive data)
        console.log("Cloudinary Configuration:", {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            isApiKeySet: !!process.env.CLOUDINARY_API_KEY,
            isApiSecretSet: !!process.env.CLOUDINARY_API_SECRET
        });

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        
        console.log("File has been uploaded", response.url);
        
        // Clean up the local file
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        console.error("Error in uploadOnCloudinary:", error.message);
        // Clean up the local file
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
}

export { uploadOnCloudinary };