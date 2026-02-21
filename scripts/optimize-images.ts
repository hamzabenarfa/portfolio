import sharp from "sharp";
import fs from "fs";
import path from "path";

const publicDir = path.join(process.cwd(), "public");
const images = ["dtalk-landing-full.png", "dtalk-about-us.png", "dtalk-service.png", "dtalk-ai.png", "dtalk-auth.png", "dtalk-mobile-full.png"];

async function convertImages() {
  for (const img of images) {
    const inputPath = path.join(publicDir, img);
    if (!fs.existsSync(inputPath)) continue;

    const outputPath = path.join(publicDir, img.replace(".png", ".webp"));
    console.log(`Converting ${img} to WebP...`);

    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);

    console.log(`Done: ${outputPath}`);
    
    // Remove the original PNG
    fs.unlinkSync(inputPath);
  }
}

convertImages().catch(console.error);
