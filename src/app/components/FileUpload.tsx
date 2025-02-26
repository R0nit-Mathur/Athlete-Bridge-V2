"use client";

import React, { useRef, useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps{
  onSuccess: (res: IKUploadResponse) => void
  onProgress?: (progress: number) => void
  fileType: "image" | "video" 
}

export default function FileUpload({
  onSuccess, onProgress, fileType = "image"
}: FileUploadProps) {

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: {message: string}) => {
    console.log("Error", err);
    setError(err.message)
    setUploading(false)
  };
  
  const handleSuccess = (response: IKUploadResponse) => {
    console.log("Success", response);
    setUploading(false)
    setError(null)
    onSuccess(response)
  };
  
  const handleProgress = (evt: ProgressEvent) => {
    if(evt.lengthComputable && onProgress){
      const percentComputable = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComputable));
    }
  };
  
  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
        if (!file.type.startsWith("video/")) {
            setError("Please upload a video file");
            return false; // Return false if invalid
        }
        if (file.size > 100 * 1024 * 1024) {
            setError("Video must be less than 100mb");
            return false; // Return false if too large
        }
        return true; // Important: Return true if valid video!
    } else {
        const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
        if (!validTypes.includes(file.type)) {
            setError("Please Upload a valid File (JPEG, PNG, WEBP, AVIF, GIF)");
            return false; // Return false if invalid type!
        }
        if (file.size > 5 * 1024 * 1024) {
            setError("Image must be less than 5mb");
            return false; // Return false if too large
        }
        return true; // Important: Return true if valid image!
    }
};
  
  
  return (
    <div className="space-y-2">
        <IKUpload
          fileName={fileType==="video" ? `video${Math.floor(Math.random()*1000)}` : `image${Math.floor(Math.random()*1000)}`}
          useUniqueFileName={true}
          validateFile={validateFile}
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleProgress}
          onUploadStart={handleStartUpload}
          folder={
            fileType === "video"? "/videos" : "/images"
          }
        />
        {
          uploading && (
            <div className="flex items-center gap-2 text-sm text-primary">
              <Loader2 className="animate-spin w-4 h-4"></Loader2>
              <span>Uploading...</span>
            </div>
          )
        }
        {
          error && (
            <div className="text-error text-sm">
              {error}
            </div>
          )
        }
    </div>
  );
}