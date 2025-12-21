// This script uses Next.js Image Optimization to generate favicons
// Place this in a script file and run it manually if needed

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Function to create a simplified fire favicon
function createFireFavicon() {
  const canvas = createCanvas(32, 32);
  const ctx = canvas.getContext('2d');
  
  // Create a gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, 32);
  gradient.addColorStop(0, '#ff9900');
  gradient.addColorStop(1, '#00b4d8');
  
  // Draw the flame shape
  ctx.fillStyle = gradient;
  
  // Top flame
  ctx.beginPath();
  ctx.moveTo(16, 2);
  ctx.quadraticCurveTo(18, 6, 18, 8);
  ctx.quadraticCurveTo(17, 10, 16, 12);
  ctx.quadraticCurveTo(15, 10, 14, 8);
  ctx.quadraticCurveTo(14, 6, 16, 2);
  ctx.fill();
  
  // Middle flame
  ctx.beginPath();
  ctx.moveTo(16, 5);
  ctx.quadraticCurveTo(19, 10, 20, 13);
  ctx.quadraticCurveTo(19, 16, 16, 23);
  ctx.quadraticCurveTo(13, 16, 12, 13);
  ctx.quadraticCurveTo(13, 10, 16, 5);
  ctx.fill();
  
  // Bottom flame
  ctx.beginPath();
  ctx.moveTo(16, 12);
  ctx.quadraticCurveTo(21, 17, 21, 22);
  ctx.quadraticCurveTo(20, 26, 16, 30);
  ctx.quadraticCurveTo(12, 26, 11, 22);
  ctx.quadraticCurveTo(11, 17, 16, 12);
  ctx.fill();
  
  // Highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.beginPath();
  ctx.moveTo(16, 17);
  ctx.quadraticCurveTo(19, 20, 19, 23);
  ctx.quadraticCurveTo(18, 26, 16, 28);
  ctx.quadraticCurveTo(14, 26, 13, 23);
  ctx.quadraticCurveTo(13, 20, 16, 17);
  ctx.fill();
  
  // Export to PNG buffer
  return canvas.toBuffer('image/png');
}

// Ensure the public directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Save the favicon as PNG
const pngBuffer = createFireFavicon();
fs.writeFileSync(path.join(publicDir, 'favicon.png'), pngBuffer);

console.log('Favicon created at public/favicon.png');
