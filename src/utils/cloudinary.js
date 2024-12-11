import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from "fs"
import multer from 'multer';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("file has been uploaded", response.url);
        return response;
      
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null        
    }
}


export { uploadOnCloudinary }