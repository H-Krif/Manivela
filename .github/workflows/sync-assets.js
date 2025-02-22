const fs = require("fs");
const path = require("path");

// Define the source and destination directories
const sourceDir = path.join(__dirname, "../src/Material");
const destDir = path.join(__dirname, "../dist/Material");

// Function to copy files from source to destination
function copyFiles(src, dest) {
  fs.readdir(src, (err, files) => {
    if (err) {
      console.error(`Error reading source directory: ${err}`);
      return;
    }

    files.forEach((file) => {
      const srcFile = path.join(src, file);
      const destFile = path.join(dest, file);

      // Check if the file already exists in the destination directory
      fs.access(destFile, fs.constants.F_OK, (err) => {
        if (err) {
          // File does not exist, so copy it
          fs.copyFile(srcFile, destFile, (err) => {
            if (err) {
              console.error(`Error copying file ${file}: ${err}`);
            } else {
              console.log(`Copied ${file} to ${dest}`);
            }
          });
        } else {
          // File already exists, so skip it
          console.log(`File ${file} already exists in ${dest}, skipping.`);
        }
      });
    });
  });
}

// Ensure the destination directory exists
fs.mkdir(destDir, { recursive: true }, (err) => {
  if (err) {
    console.error(`Error creating destination directory: ${err}`);
    return;
  }

  // Copy the files
  copyFiles(sourceDir, destDir);
});
