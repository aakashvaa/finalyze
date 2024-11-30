"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/use-transactions";

export default function PDFUploader() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { setTransactions } = useTransactions();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsLoading(true);
      const formData = new FormData();
      formData.append("pdf", file);
      console.log(formData);
      try {
        const response = await fetch("/api/extract-tables", {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (!response.ok) throw new Error("Failed to process PDF");

        const data = await response.json();
        console.log(data);
        setTransactions(data.transactions);
        toast({
          title: "Success",
          description: "PDF processed successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to process PDF",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setTransactions, toast],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300"}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <Upload className="h-12 w-12 text-gray-400" />
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p>Processing PDF...</p>
          </div>
        ) : (
          <>
            <p className="text-lg">
              {isDragActive
                ? "Drop the PDF here"
                : "Drag & drop a PDF file here, or click to select"}
            </p>
            <Button variant="outline">Select PDF</Button>
          </>
        )}
      </div>
    </div>
  );
}
