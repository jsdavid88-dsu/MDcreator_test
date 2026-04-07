import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "../lib/utils";

interface ImageUploadProps {
  onImageSelect: (base64: string, mimeType: string) => void;
  onClear: () => void;
  selectedImage: string | null;
}

export function ImageUpload({ onImageSelect, onClear, selectedImage }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        onImageSelect(base64, file.type);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    multiple: false,
  } as any);

  return (
    <div className="w-full">
      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
        1. Upload Character
      </label>
      
      {selectedImage ? (
        <div className="relative group aspect-square w-full max-w-md mx-auto border-2 border-black rounded-xl overflow-hidden bg-gray-50">
          <img
            src={selectedImage}
            alt="Selected character"
            className="w-full h-full object-contain p-4"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={onClear}
            className="absolute top-2 right-2 p-2 bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "aspect-square w-full max-w-md mx-auto border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all hover:border-black hover:bg-gray-50",
            isDragActive && "border-black bg-gray-100 scale-[0.98]"
          )}
        >
          <input {...getInputProps()} />
          <div className="p-4 bg-gray-100 rounded-full mb-4 text-gray-400 group-hover:text-black transition-colors">
            <Upload size={32} />
          </div>
          <p className="text-sm font-medium text-gray-600">Drag & drop your character</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
        </div>
      )}
    </div>
  );
}
