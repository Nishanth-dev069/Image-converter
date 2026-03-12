import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./input";
const outputDir = "./output";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);

  if (fs.statSync(inputPath).isDirectory()) return;

  // Remove ALL extensions completely
  const cleanName = file.split(".")[0];

  const outputPath = path.join(outputDir, cleanName + ".webp");

  sharp(inputPath)
    .resize({ width: 1400 })
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(() => console.log("Converted:", outputPath))
    .catch(err => console.error(err));
});
