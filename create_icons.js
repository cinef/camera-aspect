const fs = require('fs');
const path = require('path');

const svgTemplate = (color, size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#1a1a1a"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size * 0.35}" fill="none" stroke="${color}" stroke-width="${size * 0.08}"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size * 0.15}" fill="${color}"/>
  <rect x="${size * 0.15}" y="${size * 0.15}" width="${size * 0.2}" height="${size * 0.15}" rx="${size * 0.03}" fill="${color}"/>
</svg>`;

const iconsDir = '/workspace/android-app/icons';
fs.mkdirSync(iconsDir, { recursive: true });

[192, 512].forEach(size => {
  const svgContent = svgTemplate('#4CAF50', size);
  fs.writeFileSync(path.join(iconsDir, `icon-${size}.svg`), svgContent);
  fs.writeFileSync(path.join(iconsDir, `icon-maskable-${size}.svg`), svgContent);
});

console.log('SVG icons created!');
