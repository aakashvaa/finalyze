"use client";

import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  progress: number;
}

export function UploadProgress({ progress }: UploadProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 justify-center text-sm text-gray-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Processing PDF...
      </div>
    </div>
  );
}
