"use client";

import { FileText } from "lucide-react";

interface PdfViewerProps {
  content: string;
}

export function PdfViewer({ content }: PdfViewerProps) {
  if (!content) return null;

  return (
    <div className="border rounded-lg p-4 space-y-2">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5" />
        <h2 className="font-semibold">Extracted Content</h2>
      </div>
      <div className="bg-gray-50 rounded p-3 max-h-96 overflow-y-auto">
        <pre className="whitespace-pre-wrap text-sm">{content}</pre>
      </div>
    </div>
  );
}