# Public Directory

This directory contains static assets that are served at the root URL of your application.

## Files in this Directory

### Required Files

- **`robots.txt`** - Instructions for search engine crawlers
- **`manifest.json`** - Progressive Web App manifest for installability
- **`site.webmanifest`** - Alternative PWA manifest format
- **`index.html`** - Fallback HTML page (used by Firebase Hosting if Next.js isn't running)

### Recommended Files (to add)

You should add these files for a complete setup:

- **`favicon.ico`** or **`favicon.png`** - Browser tab icon (16x16 or 32x32)
- **`icon-192.png`** - PWA icon 192x192 pixels
- **`icon-512.png`** - PWA icon 512x512 pixels
- **`apple-touch-icon.png`** - iOS home screen icon (180x180)
- **`og-image.png`** - Open Graph image for social sharing (1200x630)

## How to Add Icons

1. Create your icons using a design tool (Figma, Sketch, etc.)
2. Export at the required sizes
3. Place them in this directory
4. Update `manifest.json` if you use different filenames

## Next.js Usage

Files in this directory are automatically served at the root path:
- `public/favicon.ico` → `/favicon.ico`
- `public/icon-192.png` → `/icon-192.png`

Reference them in your code without the `/public` prefix:
```tsx
<img src="/icon-192.png" alt="App Icon" />
```
