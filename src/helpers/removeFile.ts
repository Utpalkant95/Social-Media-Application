"use server"
const UPLOAD_DIR = path.resolve("public/uploads");
import path from "path";
import * as fs from 'fs';
export const removeFile = (fileName: string): boolean => {
    try {
      // Construct the full path to the file
      const filePath = path.resolve(UPLOAD_DIR, fileName);
  
      // Check if the file exists
      if (fs.existsSync(filePath)) {
        // Remove the file
        fs.unlinkSync(filePath);
        console.log(`File removed: ${filePath}`);
        return true;
      } else {
        console.error("File not found:", filePath);
        return false;
      }
    } catch (error) {
      console.error("Error removing file:", error);
      return false;
    }
  };