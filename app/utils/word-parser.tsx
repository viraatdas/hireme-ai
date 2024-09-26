import * as mammoth from 'mammoth';

export async function extractTextFromWordFile(filePath: string): Promise<string> {
  const { value: textContent } = await mammoth.extractRawText({ path: filePath });
  return textContent.trim();
}
