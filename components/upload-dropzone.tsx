"use client";

import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface UploadDropzoneProps {
  onDrop: (files: File[]) => void;
}

export function UploadDropzone({ onDrop }: UploadDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? "border-primary bg-primary/5" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        <Upload className="h-10 w-10 text-gray-400" />
        <p className="text-lg font-medium">
          {isDragActive
            ? "Drop the PDF here"
            : "Drag & drop a PDF file here, or click to select"}
        </p>
        <p className="text-sm text-gray-500">Only PDF files are supported</p>
      </div>
    </div>
  );
}