export interface PdfDocument {
  id: string;
  filename: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadResponse {
  id: string;
  filename: string;
  content: string;
}