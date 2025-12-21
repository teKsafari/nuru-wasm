#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const { JSDOM } = require('jsdom');
const svg2png = require('svg2png');

// Path constants
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const FAVICON_DIR = path.join(PUBLIC_DIR, 'favicon');
const SIZES = [16, 32, 48, 64, 128, 192, 512];

// Ensure the favicon directory exists
if (!fs.existsSync(FAVICON_DIR)) {
  fs.mkdirSync(FAVICON_DIR, { recursive: true });
}

// Create the SVG for the favicon based on the AppLogo component
function createSvgContent() {
  // Create a static version of the SVG without React-specific code
  const svgContent = `
<svg
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
  </defs>
  <g transform="translate(0,2) scale(1,0.85)">
    <path d="M16 12C16 12 23 17 23 22C23 27 19 30 16 30C13 30 9 27 9 22C9 17 16 12 16 12Z" fill="#00b4d8" />
    <path d="M16 2C16 2 19 6 19 8C19 10 16 12 16 12C16 12 13 10 13 8C13 6 16 2 16 2Z" fill="#ff9900" />
    <path d="M16 5C16 5 21 10 22 13C23 16 18 22 16 25C14 22 9 16 10 13C11 10 16 5 16 5Z" fill="url(#fireGradient)" />
    <path d="M16 17C19 19 21 22 19 25C18 27 17 28 16 28C15 28 14 27 13 25C11 22 13 19 16 17Z" fill="#fff" opacity="0.3" />
  </g>
  <ellipse
    cx="16"
    cy="30.5"
    rx="10"
    ry="2"
    fill="#222"
    opacity="0.25"
  />
</svg>
  `;

  return svgContent.trim();
}

// Add responsive styles for dark/light mode support
function createResponsiveSvg() {
  const svgContent = createSvgContent();
  const dom = new JSDOM(`<!DOCTYPE html><body>${svgContent}</body>`);
  const svg = dom.window.document.querySelector('svg');
  
  // Add style for dark/light mode adaptability
  const style = dom.window.document.createElement('style');
  style.textContent = `
    @media (prefers-color-scheme: dark) {
      #bottom-flame { fill: #00b4d8; }
      #top-flame { fill: #ff9900; }
    }
    @media (prefers-color-scheme: light) {
      #bottom-flame { fill: #00b4d8; }
      #top-flame { fill: #ff9900; }
    }
  `;
  
  // Add IDs to the paths for styling
  const paths = svg.querySelectorAll('path');
  if (paths.length >= 4) {
    paths[0].id = 'bottom-flame';
    paths[1].id = 'top-flame';
    paths[2].id = 'middle-flame';
    paths[3].id = 'highlight';
  }
  
  svg.querySelector('defs').appendChild(style);
  
  return dom.window.document.body.innerHTML;
}

// Create and save the main SVG favicon
async function createFavicons() {
  console.log('Generating favicons...');
  
  // Save the responsive SVG
  const svgFaviconPath = path.join(PUBLIC_DIR, 'favicon.svg');
  fs.writeFileSync(svgFaviconPath, createResponsiveSvg());
  console.log(`✅ Created ${svgFaviconPath}`);
  
  // Also save a copy in the favicon directory
  const svgFaviconCopyPath = path.join(FAVICON_DIR, 'favicon.svg');
  fs.writeFileSync(svgFaviconCopyPath, createResponsiveSvg());
  console.log(`✅ Created ${svgFaviconCopyPath}`);
  
  try {
    // Generate PNG favicons of various sizes
    const svgBuffer = Buffer.from(createSvgContent());
    
    for (const size of SIZES) {
      try {
        const pngBuffer = await svg2png(svgBuffer, { width: size, height: size });
        const pngPath = path.join(FAVICON_DIR, `favicon-${size}x${size}.png`);
        fs.writeFileSync(pngPath, pngBuffer);
        console.log(`✅ Created ${pngPath}`);
      } catch (err) {
        console.error(`❌ Failed to create ${size}x${size} PNG:`, err.message);
      }
    }
    
    // Create manifest.json file for PWA support
    const manifest = {
      name: 'Nuru Playground',
      short_name: 'Nuru',
      icons: SIZES.map(size => ({
        src: `/favicon/favicon-${size}x${size}.png`,
        sizes: `${size}x${size}`,
        type: 'image/png'
      })),
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
    console.log('\nTo use these favicons, make sure your layout.tsx has the following in the <head> section:');
    console.log(`
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="alternate icon" href="/favicon/favicon-32x32.png" />
<link rel="apple-touch-icon" href="/favicon/favicon-192x192.png" />
<link rel="manifest" href="/manifest.json" />
    `);
    
  } catch (err) {
    console.error('❌ Error generating PNG favicons:', err.message);
    console.log('SVG favicons were still created successfully.');
  }
}

// Execute the script
createFavicons().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
