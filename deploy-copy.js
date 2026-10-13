import fs from "fs";
import path from "path";

const srcDir = path.resolve("frontend/dist");
const destDir = path.resolve(".");

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Synchronize all uploads across root/uploads, backend/uploads, and frontend/public/uploads
function syncUploadDirectories() {
  const uploadFolders = [
    path.resolve("uploads"),
    path.resolve("backend/uploads"),
    path.resolve("frontend/public/uploads"),
    path.resolve("frontend/dist/uploads")
  ];

  for (const folder of uploadFolders) {
    if (!fs.existsSync(folder)) {
      try {
        fs.mkdirSync(folder, { recursive: true });
      } catch (e) {}
    }
  }

  // Collect all unique files across all folders
  const allFiles = new Map();
  for (const folder of uploadFolders) {
    if (fs.existsSync(folder)) {
      try {
        const files = fs.readdirSync(folder);
        for (const file of files) {
          const fullPath = path.join(folder, file);
          if (fs.statSync(fullPath).isFile() && !allFiles.has(file)) {
            allFiles.set(file, fullPath);
          }
        }
      } catch (e) {}
    }
  }

  // Ensure every folder has a copy of all uploaded files
  for (const [filename, sourcePath] of allFiles.entries()) {
    for (const folder of uploadFolders) {
      const targetPath = path.join(folder, filename);
      if (!fs.existsSync(targetPath)) {
        try {
          fs.copyFileSync(sourcePath, targetPath);
        } catch (e) {}
      }
    }
  }
}

console.log("Synchronizing upload media & candidate CV files...");
syncUploadDirectories();

console.log("Copying build output from frontend/dist to root directory...");
if (fs.existsSync(srcDir)) {
  copyRecursiveSync(srcDir, destDir);
  // Run sync again to ensure frontend/dist uploads are also populated into root uploads
  syncUploadDirectories();
  console.log("Static files and uploads copied successfully to root!");
} else {
  console.error("Error: frontend/dist directory does not exist. Did the build fail?");
  process.exit(1);
}
