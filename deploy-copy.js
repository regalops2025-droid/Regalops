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

console.log("Copying build output from frontend/dist to root directory...");
if (fs.existsSync(srcDir)) {
  copyRecursiveSync(srcDir, destDir);
  console.log("Static files copied successfully to root!");
} else {
  console.error("Error: frontend/dist directory does not exist. Did the build fail?");
  process.exit(1);
}
