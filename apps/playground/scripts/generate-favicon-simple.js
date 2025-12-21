#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Path constants
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const FAVICON_DIR = path.join(PUBLIC_DIR, 'favicon');

// Ensure the favicon directory exists
if (!fs.existsSync(FAVICON_DIR)) {
  fs.mkdirSync(FAVICON_DIR, { recursive: true });
}

// Create the SVG for the favicon based on the AppLogo component
function createSvgContent() {
  // Create a static version of the SVG without React-specific code
  const svgContent = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 32 32"
  fill="none"
>
  <defs>
    <linearGradient id="fireGradient" x1="16" y1="0" x2="16" y2="32" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ff9900" />
      <stop offset="1" stop-color="#00b4d8" />
    </linearGradient>
    <style>
      @media (prefers-color-scheme: dark) {
        #bottom-flame { fill: #00b4d8; }
        #top-flame { fill: #ff9900; }
      }
      @media (prefers-color-scheme: light) {
        #bottom-flame { fill: #00b4d8; }
        #top-flame { fill: #ff9900; }
      }
    </style>
  </defs>
  <g transform="translate(0,2) scale(1,0.85)">
    <path id="bottom-flame" d="M16 12C16 12 23 17 23 22C23 27 19 30 16 30C13 30 9 27 9 22C9 17 16 12 16 12Z" fill="#00b4d8" />
    <path id="top-flame" d="M16 2C16 2 19 6 19 8C19 10 16 12 16 12C16 12 13 10 13 8C13 6 16 2 16 2Z" fill="#ff9900" />
    <path id="middle-flame" d="M16 5C16 5 21 10 22 13C23 16 18 22 16 25C14 22 9 16 10 13C11 10 16 5 16 5Z" fill="url(#fireGradient)" />
    <path id="highlight" d="M16 17C19 19 21 22 19 25C18 27 17 28 16 28C15 28 14 27 13 25C11 22 13 19 16 17Z" fill="#fff" opacity="0.3" />
  </g>
  <ellipse
    cx="16"
    cy="30.5"
    rx="10"
    ry="2"
    fill="#222"
    opacity="0.25"
  />
</svg>`;

  return svgContent.trim();
}

// Create and save favicon files
function createFavicons() {
  console.log('Generating favicon...');
  
  // Save the SVG as favicon.svg
  const svgFaviconPath = path.join(PUBLIC_DIR, 'favicon.svg');
  fs.writeFileSync(svgFaviconPath, createSvgContent());
  console.log(`✅ Created ${svgFaviconPath}`);
  
  // Save the SVG as icon.svg
  const iconSvgPath = path.join(PUBLIC_DIR, 'icon.svg');
  fs.writeFileSync(iconSvgPath, createSvgContent());
  console.log(`✅ Created ${iconSvgPath}`);
  
  // Also save copies in the favicon directory
  const svgFaviconCopyPath = path.join(FAVICON_DIR, 'favicon.svg');
  fs.writeFileSync(svgFaviconCopyPath, createSvgContent());
  console.log(`✅ Created ${svgFaviconCopyPath}`);
  
  const iconSvgCopyPath = path.join(FAVICON_DIR, 'icon.svg');
  fs.writeFileSync(iconSvgCopyPath, createSvgContent());
  console.log(`✅ Created ${iconSvgCopyPath}`);
  
  // Create manifest.json file for PWA support
  const manifest = {
    name: 'Nuru Playground',
    short_name: 'Nuru',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      }
    ],
    theme_color: '#ff9900',
    background_color: '#1F2937',
    display: 'standalone',
    start_url: '/'
  };
  
  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('✅ Created manifest.json');
  
  console.log('\n🎉 Favicon generation complete!');
  console.log('\nTo generate PNG versions of the favicon, install the required dependencies:');
  console.log('npm install --save-dev canvas jsdom svg2png');
  console.log('\nThen run the full version of this script.');
}

// Create icon.svg (same as favicon.svg but with a different name)
function createIconSvg() {
  console.log('Generating icon.svg...');
  
  // Save the SVG as icon.svg
  const iconSvgPath = path.join(PUBLIC_DIR, 'icon.svg');
  fs.writeFileSync(iconSvgPath, createSvgContent());
  console.log(`✅ Created ${iconSvgPath}`);
  
  // Also save a copy in the favicon directory
  const iconSvgCopyPath = path.join(FAVICON_DIR, 'icon.svg');
  fs.writeFileSync(iconSvgCopyPath, createSvgContent());
  console.log(`✅ Created ${iconSvgCopyPath}`);
}

// Execute the script
createFavicons();
createIconSvg();
