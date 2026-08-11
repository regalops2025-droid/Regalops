import fs from "fs";

function logError(error) {
  const logMessage = `[${new Date().toISOString()}] BOOT ERROR: ${error.stack || error.message || error}\n`;
  try {
    fs.appendFileSync("boot_error.log", logMessage);
  } catch (e) {
    // Ignore write failures
  }
  console.error(logMessage);
}

try {
  process.on("unhandledRejection", (reason) => {
    logError(new Error(`Unhandled Rejection: ${reason}`));
  });
  
  process.on("uncaughtException", (error) => {
    logError(error);
  });

  console.log("Root server.js bootloader starting...");
  
  import("./dist/server/server.js").catch((err) => {
    logError(new Error(`Failed to load Vinxi frontend: ${err.message}`));
  });
  
  import("./backend/server.js").catch((err) => {
    logError(new Error(`Failed to load Express backend: ${err.message}`));
  });
  
} catch (error) {
  logError(error);
}
