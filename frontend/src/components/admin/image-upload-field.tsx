import React, { useState, useRef, useEffect } from "react";
import { Upload, Image as ImageIcon, X, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { compressImageFile } from "@/lib/image-compress";

const PRESET_BANNERS = [
  { label: "Architecture", url: "/solutions-strategy.jpg" },
  { label: "Cloud & App Dev", url: "/solutions-app-dev.jpg" },
  { label: "AI & Data", url: "/hero-slide-ai.jpg" },
  { label: "Cyber Security", url: "/hero-slide-cyber.jpg" },
  { label: "Infrastructure", url: "/hero-slide-1.jpg" },
];

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  recommendedDimensions?: string;
  compact?: boolean;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  helperText,
  recommendedDimensions,
  compact = true,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatusText, setUploadStatusText] = useState("Uploading image from device...");
  const [uploadError, setUploadError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [imageDim, setImageDim] = useState<{ width: number; height: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value) {
      setImageDim(null);
      setLoadError(false);
      return;
    }
    setLoadError(false);
    const img = new Image();
    img.src = value;
    img.onload = () => {
      setImageDim({ width: img.naturalWidth, height: img.naturalHeight });
      setLoadError(false);
    };
    img.onerror = () => {
      setLoadError(true);
      setImageDim(null);
    };
  }, [value]);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate mime type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, JPG, WEBP, GIF).");
      return;
    }

    // Validate size (15MB max before compression)
    if (file.size > 15 * 1024 * 1024) {
      setUploadError("Image file size must be less than 15MB.");
      return;
    }

    setIsUploading(true);
    setUploadError("");
    setUploadStatusText("Optimizing image for fast loading...");

    try {
      // 1. Client-side compression to WebP (shrinks 5MB -> 100KB)
      const optimizedFile = await compressImageFile(file, {
        maxWidth: 1600,
        maxHeight: 1200,
        quality: 0.82,
      });

      setUploadStatusText("Uploading optimized image...");

      const formData = new FormData();
      formData.append("image", optimizedFile);

      const response = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.url) {
        onChange(data.url);
      } else {
        throw new Error("Server did not return image URL.");
      }
    } catch (err: any) {
      console.warn("Backend upload failed, using optimized base64 fallback:", err);
      // Fallback to FileReader base64 with optimized file so payload is small
      try {
        const optimizedFile = await compressImageFile(file, { maxWidth: 1000, quality: 0.75 });
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result && typeof e.target.result === "string") {
            onChange(e.target.result);
          }
        };
        reader.readAsDataURL(optimizedFile);
      } catch (fallbackErr) {
        setUploadError(err.message || "Failed to upload image from device.");
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled || isUploading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      <div className="flex items-center justify-between">
        <label className={`block font-semibold text-foreground ${compact ? "text-xs mb-0.5" : "text-sm"}`}>
          {label} {required && <span className="text-destructive">*</span>}
        </label>
        {value && !isUploading && (
          <button
            type="button"
            onClick={() => onChange("")}
            disabled={disabled}
            className="text-[11px] text-rose-500 hover:text-rose-600 transition-colors cursor-pointer flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Remove
          </button>
        )}
      </div>

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        disabled={disabled || isUploading}
        className="hidden"
        id={`upload-device-${label.replace(/\s+/g, "-").toLowerCase()}`}
      />

      {/* When an image is already selected/uploaded */}
      {value ? (
        compact ? (
          <div className="group relative overflow-hidden rounded-lg border border-border bg-surface/50 p-2 transition-all hover:border-primary/40">
            <div className="flex items-center gap-2.5">
              <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-md border border-border/80 bg-surface-2 flex items-center justify-center">
                {loadError ? (
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                ) : (
                  <img
                    src={value}
                    alt={label}
                    className="max-h-full max-w-full object-contain p-0.5 transition-transform duration-200 group-hover:scale-105"
                    onError={() => setLoadError(true)}
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 shrink-0" />
                    Uploaded
                  </span>
                  {imageDim && !loadError && (
                    <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-surface-2 border border-border/70 font-mono text-muted-foreground">
                      {imageDim.width}×{imageDim.height}px
                    </span>
                  )}
                </div>
                <p className="truncate text-[10.5px] text-muted-foreground font-mono" title={value}>
                  {value.startsWith("data:") ? "Local upload" : value}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled || isUploading}
                  className="inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer disabled:opacity-50"
                >
                  {isUploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-[11px] text-muted-foreground hover:text-foreground cursor-pointer underline px-1"
                >
                  {showUrlInput ? "Hide" : "URL"}
                </button>
              </div>
            </div>

            {showUrlInput && (
              <div className="mt-2 pt-2 border-t border-border/60">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Or paste direct image URL..."
                  disabled={disabled || isUploading}
                  className="w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs outline-none focus:border-primary placeholder:text-muted-foreground"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface/50 p-2.5 sm:p-3 transition-all hover:border-primary/40">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <div className="relative h-28 xs:h-32 sm:h-20 w-full sm:w-28 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-surface-2 shadow-xs flex items-center justify-center">
                {loadError ? (
                  <div className="flex flex-col items-center justify-center p-2 text-center text-amber-500">
                    <AlertCircle className="h-6 w-6 mb-1" />
                    <span className="text-[10px] font-semibold">Image broken</span>
                  </div>
                ) : (
                  <img
                    src={value}
                    alt={label}
                    className="max-h-full max-w-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                    onError={() => setLoadError(true)}
                  />
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-1.5 sm:space-y-2">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {loadError ? (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>File not found on server or link broken</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>Image uploaded</span>
                    </div>
                  )}
                  {imageDim && !loadError && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-surface-2 border border-border/80 text-foreground font-mono font-medium">
                      {imageDim.width} × {imageDim.height} px
                    </span>
                  )}
                  {recommendedDimensions && (
                    <span className="text-[10px] sm:text-[11px] text-muted-foreground break-words">
                      (Target: {recommendedDimensions})
                    </span>
                  )}
                </div>
                <p className="truncate text-xs text-muted-foreground font-mono" title={value}>
                  {value.startsWith("data:") ? "Local upload (embedded)" : value}
                </p>
                {loadError ? (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium leading-tight">
                    ⚠ Please click &ldquo;Replace image&rdquo; below to upload photo from your device.
                  </p>
                ) : (
                  <p className="text-[11px] text-emerald-600/90 dark:text-emerald-400/90 font-medium leading-tight">
                    ✓ Full image preserved naturally without cutting or blocking
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled || isUploading}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-white cursor-pointer disabled:opacity-50"
                  >
                    {isUploading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    {isUploading ? "Uploading..." : "Replace image"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer underline"
                  >
                    {showUrlInput ? "Hide URL" : "Edit URL"}
                  </button>
                </div>
              </div>
            </div>

            {showUrlInput && (
              <div className="mt-3 pt-3 border-t border-border/60">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Or paste direct image URL..."
                  disabled={disabled || isUploading}
                  className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none focus:border-primary placeholder:text-muted-foreground"
                />
              </div>
            )}
          </div>
        )
      ) : (
        /* Empty state: Upload from device dropzone */
        compact ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => {
              if (!disabled && !isUploading) {
                fileInputRef.current?.click();
              }
            }}
            className={`group relative flex items-center justify-between rounded-lg border border-dashed px-3 py-2 transition-all cursor-pointer ${
              isDragging
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-border/80 bg-surface/30 hover:border-primary/60 hover:bg-primary/2"
            } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {isUploading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-xs font-medium text-foreground">{uploadStatusText}</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                    <Upload className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-foreground block truncate">
                      Click to upload image or drag &amp; drop
                    </span>
                    {recommendedDimensions && (
                      <span className="text-[10px] text-muted-foreground block truncate">
                        {recommendedDimensions}
                      </span>
                    )}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 text-primary px-2.5 py-1 text-xs font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                  <Upload className="h-3 w-3" />
                  Browse
                </span>
              </>
            )}
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => {
              if (!disabled && !isUploading) {
                fileInputRef.current?.click();
              }
            }}
            className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
              isDragging
                ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                : "border-border/80 bg-surface/30 hover:border-primary/60 hover:bg-primary/2"
            } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 py-3">
                <div className="rounded-full bg-primary/10 p-3 text-primary animate-pulse">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
                <p className="text-sm font-semibold text-foreground">{uploadStatusText}</p>
                <p className="text-xs text-muted-foreground">Auto-compressing to lightweight modern WebP format...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2.5 py-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110 shadow-xs">
                  <Upload className="h-6 w-6" />
                </div>

                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm group-hover:bg-primary/90 transition-all">
                    <Upload className="h-3.5 w-3.5" />
                    Upload from device
                  </span>
                  <p className="mt-2 text-xs text-muted-foreground">
                    or drag and drop an image here
                  </p>
                </div>

                {recommendedDimensions && (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                    <span>📐 Recommended: {recommendedDimensions}</span>
                  </div>
                )}

                <p className="text-[11px] text-muted-foreground/80">
                  PNG, JPG, WEBP or GIF (Auto-optimized for instant page loading)
                </p>
              </div>
            )}
          </div>
        )
      )}

      {/* Quick Enterprise Preset Banners */}
      {!disabled && !isUploading && (
        <div className="pt-0.5">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[10px] text-muted-foreground flex items-center gap-1 mr-1">
              <Sparkles className="h-2.5 w-2.5 text-primary" /> Presets:
            </span>
            {PRESET_BANNERS.map((preset) => (
              <button
                key={preset.url}
                type="button"
                onClick={() => onChange(preset.url)}
                className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9.5px] font-medium transition-all cursor-pointer ${
                  value === preset.url
                    ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/30"
                    : "border-border/80 bg-surface/50 text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Upload Error Alert */}
      {uploadError && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 px-2.5 py-1.5 text-xs text-destructive">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1">{uploadError}</span>
          <button
            type="button"
            onClick={() => setUploadError("")}
            className="text-destructive/80 hover:text-destructive cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {helperText && !compact && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
