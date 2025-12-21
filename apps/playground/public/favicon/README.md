# Nuru Playground Favicon

This directory contains the favicon assets for the Nuru Playground application.

## Files

- `favicon.svg` - The main SVG favicon with theme support
- `icon.svg` - An alternative SVG icon
- PNG versions in various sizes (when generated with the full script):
  - 16x16, 32x32, 48x48, 64x64, 128x128, 192x192, 512x512

## Features

- **Theme Support**: The SVG favicon adapts to light and dark mode
- **Responsive**: Looks good at any size
- **Animated**: When used in the application, the logo has animation effects
- **PWA Ready**: Properly configured for Progressive Web App support

## Usage

The favicon is automatically loaded through the metadata configuration in `app/layout.tsx` and directly in the `<head>` section.

### Customization

To customize the favicon:

1. Edit the SVG in the AppLogo component in `components/app-logo.tsx`
2. Run the favicon generator script:
   ```bash
   npm run generate-favicon
   ```

3. For full PNG generation (requires additional dependencies):
   ```bash
   npm run generate-favicon-full
   ```

## Design

The favicon represents the Nuru flame symbol with:
- Top part: Orange/amber flame (#ff9900)
- Bottom part: Blue water flame (#00b4d8)
- Middle: Gradient blend between the two colors
- Light white highlight in the center
- Subtle shadow at the base

The design symbolizes the fire of knowledge and learning, with a fusion of traditional (orange/fire) and modern (blue/technology) elements.

## Conversion to ICO (if needed)

To convert the SVG to an ICO file, you can use:
1. Online converter: https://favicon.io/ or https://realfavicongenerator.net/
2. Or run this command if you have ImageMagick installed:
   ```bash
   convert public/favicon.svg public/favicon.ico
   ```
3. Or use Node.js packages like `svg2png` and then `png-to-ico`

Modern browsers support SVG favicons, which offer better quality and adaptability.
