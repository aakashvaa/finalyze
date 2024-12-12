"use client";

import { useTransactions } from "@/hooks/store";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

interface UploadDropzoneProps {
  onDrop: (files: File[]) => void;
  loading: boolean;
}

export function UploadDropzone({ onDrop, loading }: UploadDropzoneProps) {
  const { data } = useTransactions();
  const { transactions } = data;
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
      className={`border-2 border-dashed w-full flex justify-center items-center  rounded-lg p-5 text-center cursor-pointer transition-colors ${
        loading
          ? "border-gray-300 bg-gray-100 cursor-not-allowed"
          : isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} disabled={loading} />
      <div className={`w-full flex flex-col justify-center items-center gap-2`}>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {!loading && transactions.length ? (
              <Image
                className={`  ${loading ? "text-gray-300" : "text-gray-400"}`}
                src="XpenseLogo.svg"
                alt="logo"
                width={35}
                height={35}
              />
            ) : (
              <Upload
                className={` w-full  ${loading ? "text-gray-300" : "text-gray-400"}`}
              />
            )}
            {transactions.length === 0 && (
              <>
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
          </>
        )}
      </div>
    </div>
  );
}
