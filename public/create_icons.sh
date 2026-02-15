#!/bin/bash
# Create simple placeholder icons using ImageMagick or a simple SVG fallback
# If ImageMagick is not available, we'll create a simple SVG

if command -v convert &> /dev/null; then
  # Create 192x192 icon
  convert -size 192x192 xc:#0f172a -pointsize 72 -fill white -gravity center -annotate +0+0 "NPI" icon-192.png
  # Create 512x512 icon
  convert -size 512x512 xc:#0f172a -pointsize 192 -fill white -gravity center -annotate +0+0 "NPI" icon-512.png
  echo "Icons created using ImageMagick"
else
  echo "ImageMagick not found. Creating SVG placeholders instead."
  # Create simple SVG icons
  echo '<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192"><rect width="192" height="192" fill="#0f172a"/><text x="96" y="120" font-family="Arial" font-size="72" fill="white" text-anchor="middle">NPI</text></svg>' > icon-192.svg
  echo '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="#0f172a"/><text x="256" y="320" font-family="Arial" font-size="192" fill="white" text-anchor="middle">NPI</text></svg>' > icon-512.svg
  echo "SVG placeholders created. You may want to convert these to PNG or update manifest.json to use SVG."
fi
