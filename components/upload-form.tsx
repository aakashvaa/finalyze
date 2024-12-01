"use client";

import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadPdf } from "@/lib/pdf-service";
import { UploadDropzone } from "./upload-dropzone";
import { UploadProgress } from "./upload-progress";
import { PdfViewer } from "./pdf-viewer";
import { UploadResponse } from "@/lib/types";

export function UploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState<string>("");
  const { toast } = useToast();

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (!file.type.includes("pdf")) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }

      setIsUploading(true);
      setProgress(0);

      try {
        const data = await uploadPdf(file);
        // console.log("hit", data.content.split("\n"));
        // setExtractedText(data.content);
        toast({
          title: "Success",
          description: "PDF uploaded and processed successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to process PDF",
          variant: "destructive",
        });
        console.log(error);
      } finally {
        setIsUploading(false);
        setProgress(100);
      }
    },
    [toast],
  );

  return (
    <div className="space-y-6">
      <UploadDropzone onDrop={handleDrop} />
      {isUploading && <UploadProgress progress={progress} />}
      <PdfViewer content={extractedText} />
    </div>
  );
}
