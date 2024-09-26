// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { extractTextFromPDFFile } from '../../utils/pdf-parser'; // Make sure the path is correct

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const uploadedFiles = formData.getAll('file');

    let fileName = '';
    let parsedText = '';

    if (uploadedFiles && uploadedFiles.length > 0) {
      const uploadedFile = uploadedFiles[0] as File;

      console.log('Uploaded file details:', {
        name: uploadedFile.name,
        type: uploadedFile.type,
        size: uploadedFile.size,
      });

      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

      fileName = `${uuidv4()}.pdf`;
      const tempFilePath = path.join('/tmp', fileName);
      console.log('Temporary file path:', tempFilePath);

      await fs.writeFile(tempFilePath, fileBuffer);
      console.log('File saved successfully at:', tempFilePath);

      parsedText = await extractTextFromPDFFile(tempFilePath);
      console.log('Text extracted successfully. Length:', parsedText.length);

      await fs.unlink(tempFilePath);
      console.log('Temporary file deleted successfully.');
    } else {
      return NextResponse.json({ error: 'No File Found' }, { status: 404 });
    }

    const response = new NextResponse(parsedText);
    response.headers.set('FileName', fileName);
    return response;
  } catch (error) {
    console.error('Error processing the file:', error);
    return NextResponse.json({ error: 'Failed to process the file.' }, { status: 500 });
  }
}
