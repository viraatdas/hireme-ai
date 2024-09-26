import pdf from 'pdf-parse';
import { promises as fs } from 'fs'; // Import the file system module

/**
 * Extracts text from a PDF file using the pdf-parse library.
 * @param filePath - The path to the PDF file.
 * @returns The extracted text content as a string.
 */
export async function extractTextFromPDFFile(filePath: string): Promise<string> {
  try {
    // Read the PDF file into a Buffer
    const fileBuffer = await fs.readFile(filePath);

    // Use pdf-parse to extract text from the Buffer
    const data = await pdf(fileBuffer);
    
    return data.text;
  } catch (error) {
    console.error("Failed to extract text from PDF:", error);
    throw new Error("Failed to extract text from PDF.");
  }
}
