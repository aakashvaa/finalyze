"use client";

import { useCallback, useState } from "react";

import { uploadPdf } from "@/lib/pdf-service";
import { UploadDropzone } from "./upload-dropzone";
import { UploadProgress } from "./upload-progress";
import { UploadResponse } from "@/lib/types";
import { useTransactions } from "@/hooks/store";
import TransactionsList from "./transaction";
import { useToast } from "@/hooks/use-toast";
export function UploadForm() {
  const [isUploading, setIsUploading] = useState(false);

  const [extractedText, setExtractedText] = useState<string>("");
  const { toast } = useToast();
  const { setTransactions } = useTransactions();

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

      try {
        const data = await uploadPdf(file);
        console.log("hit", data);
        setTransactions(data);
        // setExtractedText(data);
        toast({
          description: "PDF uploaded and processed successfully",
        });
      } catch (error) {
        toast({
          description: "Failed to process PDF",
          variant: "destructive",
        });
        console.log(error);
      } finally {
        setIsUploading(false);
      }
    },
    [toast],
  );

  return (
    <div className="space-y-6">
      <UploadDropzone loading={isUploading} onDrop={handleDrop} />
    </div>
  );
}
