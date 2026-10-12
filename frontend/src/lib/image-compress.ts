/**
 * Client-side image compression and optimization utility.
 * Compresses images in-browser before upload to reduce payload size by 80-95%
 * while preserving high visual fidelity.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0 to 1
  mimeType?: string; // 'image/webp' | 'image/jpeg'
}

export async function compressImageFile(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  const {
    maxWidth = 1600,
    maxHeight = 1200,
    quality = 0.82,
    mimeType = "image/webp",
  } = options;

  // Never process SVG or animated GIF
  if (file.type === "image/svg+xml" || file.type === "image/gif") {
    return file;
  }

  // If file is already tiny (under 120KB), keep as is
  if (file.size < 120 * 1024) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const src = readerEvent.target?.result as string;
      if (!src) {
        resolve(file);
        return;
      }

      const img = new Image();
      img.onload = () => {
        try {
          let { width, height } = img;

          // Compute new dimensions keeping aspect ratio
          if (width > maxWidth || height > maxHeight) {
            const widthRatio = maxWidth / width;
            const heightRatio = maxHeight / height;
            const bestRatio = Math.min(widthRatio, heightRatio);

            width = Math.round(width * bestRatio);
            height = Math.round(height * bestRatio);
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(file);
            return;
          }

          // Use high quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, width, height);

          // Test if WebP export is supported, else fallback to jpeg
          const targetMime = canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0
            ? mimeType
            : "image/jpeg";

          canvas.toBlob(
            (blob) => {
              if (!blob || blob.size >= file.size) {
                // If compressed blob is unexpectedly larger, use original
                resolve(file);
              } else {
                const ext = targetMime === "image/webp" ? ".webp" : ".jpg";
                const newName = file.name.replace(/\.[^/.]+$/, "") + ext;
                const compressedFile = new File([blob], newName, {
                  type: targetMime,
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              }
            },
            targetMime,
            quality
          );
        } catch (err) {
          console.warn("Image compression canvas error, using original file:", err);
          resolve(file);
        }
      };

      img.onerror = () => {
        resolve(file);
      };

      img.src = src;
    };

    reader.onerror = () => {
      resolve(file);
    };

    reader.readAsDataURL(file);
  });
}
