import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.resolve("public/uploads");

export const handleFileInApiRoute = async (file: File): Promise<File | null> => {
  try {
    // Ensure the upload directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const fileBlob = file as Blob;

    if (fileBlob) {
      // Convert Blob to a File-like object
      const convertedFile = new File([fileBlob], file.name, {
        type: fileBlob.type,
      });

      const buffer = Buffer.from(await file.arrayBuffer());

      // Define the path where the file will be saved
      const filePath = path.resolve(UPLOAD_DIR, convertedFile.name);

      // Handle file name conflicts by appending a timestamp
      let finalFilePath = filePath;
      if (fs.existsSync(finalFilePath)) {
        const ext = path.extname(convertedFile.name);
        const baseName = path.basename(convertedFile.name, ext);
        finalFilePath = path.resolve(
          UPLOAD_DIR,
          `${baseName}-${Date.now()}${ext}`
        );
      }

      // Write the file to the disk
      fs.writeFileSync(finalFilePath, buffer);

      console.log("File saved:", finalFilePath);

      return convertedFile;
    } else {
      console.error("No file blob found");
      return null;
    }
  } catch (error) {
    console.error("Error handling file:", error);
    return null;
  }
};
