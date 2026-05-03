"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Upload, X, ImagePlus, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ value, onChange, maxImages = 10 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const remaining = maxImages - value.length;
      if (remaining <= 0) {
        toast(`Maximum ${maxImages} images allowed`, "warning");
        return;
      }

      const toUpload = fileArray.slice(0, remaining);
      const oversized = toUpload.filter((f) => f.size > 5 * 1024 * 1024);
      if (oversized.length > 0) {
        toast("Each image must be under 5MB", "error");
        return;
      }

      setUploading(true);
      try {
        const urls: string[] = [];
        for (const file of toUpload) {
          const form = new FormData();
          form.append("file", file);
          const res = await fetch("/api/upload", { method: "POST", body: form });
          const data = await res.json();
          if (data.url) urls.push(data.url);
        }
        onChange([...value, ...urls]);
        toast(`${urls.length} image(s) uploaded successfully`, "success");
      } catch {
        toast("Failed to upload images. Please try again.", "error");
      } finally {
        setUploading(false);
      }
    },
    [value, onChange, maxImages]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        uploadFiles(e.dataTransfer.files);
      }
    },
    [uploadFiles]
  );

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const moveImage = (from: number, to: number) => {
    const newImages = [...value];
    const [moved] = newImages.splice(from, 1);
    newImages.splice(to, 0, moved);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <label
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        className={cn(
          "block w-full border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
          dragOver
            ? "border-primary-400 bg-primary-50"
            : "border-slate-200 hover:border-primary-300 hover:bg-slate-50",
          value.length >= maxImages && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={value.length >= maxImages || uploading}
          onChange={(e) => e.target.files && uploadFiles(e.target.files)}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            <p className="text-sm text-slate-600 font-medium">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <ImagePlus className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="font-medium text-slate-700">
                Drop images here or <span className="text-primary-600">click to upload</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG, WebP up to 5MB each · Max {maxImages} images
              </p>
            </div>
          </div>
        )}

        <div className="mt-3 flex justify-center">
          <span className="text-xs text-slate-400">
            {value.length} / {maxImages} images added
          </span>
        </div>
      </label>

      {/* Preview Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {value.map((url, index) => (
            <div key={url} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-100">
              <Image
                src={url}
                alt={`Property image ${index + 1}`}
                fill
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, index - 1)}
                    className="bg-white/90 text-slate-700 text-xs p-1 rounded"
                    title="Move left"
                  >
                    ←
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="bg-red-500 text-white p-1.5 rounded-lg"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                {index < value.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, index + 1)}
                    className="bg-white/90 text-slate-700 text-xs p-1 rounded"
                    title="Move right"
                  >
                    →
                  </button>
                )}
              </div>

              {/* Main badge */}
              {index === 0 && (
                <span className="absolute top-1 left-1 bg-primary-700 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {value.length === 0 && (
        <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Add at least 3 photos to increase your listing's visibility by 3x
        </div>
      )}
    </div>
  );
}
