"use client";

import { useState } from "react";
import { ImageIcon, Upload } from "lucide-react";

export function ImageUpload({
  type = "product",
  onUploaded,
}: {
  type?: string;
  onUploaded: (urls: { imageUrl: string; thumbnailUrl: string | null }) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setPreview(URL.createObjectURL(file));
    setStatus("uploading");
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Upload failed");
        return;
      }
      setStatus("done");
      onUploaded({ imageUrl: data.imageUrl, thumbnailUrl: data.thumbnailUrl });
    } catch {
      setStatus("error");
      setMessage("Upload failed — check your connection");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-md border border-dashed border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <ImageIcon className="h-6 w-6 text-neutral-400" />
        )}
      </div>
      <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        <Upload className="h-3.5 w-3.5" />
        {status === "uploading" ? "Uploading…" : "Choose image"}
      </label>
      {message && <p className="text-xs text-neutral-500">{message}</p>}
    </div>
  );
}
