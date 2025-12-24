"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  currentImage?: string | null;
  onUploadComplete: (url: string) => void;
  onError?: (error: string) => void;
  type: "logo" | "team" | "avatar";
  className?: string;
  size?: "sm" | "md" | "lg";
  shape?: "square" | "circle";
  placeholder?: string;
}

export default function ImageUpload({
  currentImage,
  onUploadComplete,
  onError,
  type,
  className = "",
  size = "md",
  shape = "square",
  placeholder,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const shapeClasses = {
    square: "rounded-2xl",
    circle: "rounded-full",
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      onError?.("Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.");
      return;
    }

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      onError?.("File too large. Maximum size is 5MB.");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const res = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await res.json();
      onUploadComplete(data.url);
    } catch (err) {
      console.error("Upload error:", err);
      onError?.(err instanceof Error ? err.message : "Upload failed");
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
  };

  const getPlaceholderContent = () => {
    if (placeholder) {
      return (
        <span className="text-xl font-bold">
          {placeholder.substring(0, 2).toUpperCase()}
        </span>
      );
    }
    return (
      <span className="material-symbols-outlined text-2xl text-gray-500">
        {type === "avatar" ? "person" : type === "logo" ? "business" : "group"}
      </span>
    );
  };

  return (
    <div className={`relative group ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className={`
          ${sizeClasses[size]} 
          ${shapeClasses[shape]} 
          relative overflow-hidden cursor-pointer
          bg-gradient-to-br from-gray-700 to-gray-800 
          border-2 border-white/10 hover:border-neon-green/50
          flex items-center justify-center
          transition-all duration-300
          ${uploading ? "opacity-50 cursor-wait" : ""}
        `}
      >
        {preview ? (
          <img
            src={preview}
            alt="Upload preview"
            className="w-full h-full object-cover"
          />
        ) : (
          getPlaceholderContent()
        )}

        {/* Overlay on hover */}
        <div className={`
          absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100
          flex items-center justify-center transition-opacity
          ${shapeClasses[shape]}
        `}>
          {uploading ? (
            <span className="material-symbols-outlined text-white animate-spin">
              progress_activity
            </span>
          ) : (
            <span className="material-symbols-outlined text-white">
              photo_camera
            </span>
          )}
        </div>
      </div>

      {/* Change button */}
      <button
        type="button"
        onClick={() => !uploading && inputRef.current?.click()}
        disabled={uploading}
        className={`
          mt-2 text-xs font-bold px-3 py-1.5 rounded-full
          transition-colors block w-full text-center
          ${uploading
            ? "bg-gray-700 text-gray-500 cursor-wait"
            : "bg-neon-green/10 text-neon-green border border-neon-green/30 hover:border-neon-green hover:text-white"
          }
        `}
      >
        {uploading ? "Uploading..." : preview ? "Change" : "Upload"}
      </button>
    </div>
  );
}
