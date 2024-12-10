"use client";

import { Loader2, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface UploadDropzoneProps {
  onDrop: (files: File[]) => void;
  loading: boolean;
}

export function UploadDropzone({ onDrop, loading }: UploadDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    disabled: loading, // Disable dropzone when loading
  });

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        loading
          ? "border-gray-300 bg-gray-100 cursor-not-allowed"
          : isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} disabled={loading} />
      <div className="flex flex-col items-center gap-2">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Upload
              className={`h-10 w-10 ${loading ? "text-gray-300" : "text-gray-400"}`}
            />
            <p className="text-lg font-medium">
              {loading
                ? "Uploading, please wait..."
                : isDragActive
                  ? "Drop the PDF here"
                  : "Drag & drop a PDF file here, or click to select"}
            </p>
            <p className="text-sm text-gray-500">
              {loading ? "" : "Only PDF files are supported"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
