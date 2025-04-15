// utils/fileUpload.ts
import fs from "fs";
import path from "path";

export const saveFile = async (file: File) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Ensure the /public/uploads directory exists
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Save the file to /public/uploads
  const filePath = path.join(uploadDir, file.name);
  fs.writeFileSync(filePath, buffer);

  // Return the URL to access the file
  return `/uploads/${file.name}`;
};