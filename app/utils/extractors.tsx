import { extractTextFromPDFFile } from './pdf-parser';
import { extractTextFromWordFile } from './word-parser';

export async function extractTextFromPDF(filePath: string): Promise<string> {
  return await extractTextFromPDFFile(filePath);
}

export async function extractTextFromWord(filePath: string): Promise<string> {
  return await extractTextFromWordFile(filePath);
}
