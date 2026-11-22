import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background
ctx.fillStyle = '#0B1A25';
ctx.fillRect(0, 0, width, height);

// Accent Border Top
ctx.fillStyle = '#C2432B';
ctx.fillRect(0, 0, width, 8);

ctx.strokeStyle = '#243947';
ctx.beginPath(); ctx.moveTo(72, 479); ctx.lineTo(1128, 479); ctx.stroke();
ctx.fillStyle = '#AFC0C8';
ctx.font = '600 20px sans-serif';
ctx.fillText('ANDREW LAM  /  SINGAPORE', 72, 83);
ctx.fillStyle = '#EEF1EF';
ctx.font = 'bold 73px sans-serif';
ctx.fillText('Operations', 68, 202);
ctx.fillText('intelligence.', 68, 283);
ctx.fillStyle = '#9ACDDD';
ctx.font = '600 33px sans-serif';
ctx.fillText('Experience. Analytics. Applied AI.', 72, 354);
ctx.fillStyle = '#AFC0C8';
ctx.font = '23px sans-serif';
ctx.fillText('20+ years in operations. An emerging Industrial AI focus.', 72, 407);

// Evidence motif, consistent with the interactive homepage.
const containers = [
  [825, 166, 230, '#9DB8C9', 'CONCEPT'],
  [787, 246, 306, '#9DB8C9', 'SYNTHETIC'],
  [750, 326, 380, '#4A86AD', 'REAL RECORDS'],
];
ctx.font = 'bold 16px sans-serif';
for (const [x, y, containerWidth, color, label] of containers) {
  ctx.fillStyle = label === 'CONCEPT' ? '#102330' : color;
  ctx.fillRect(x, y, containerWidth, 62);
  ctx.strokeStyle = color; ctx.strokeRect(x, y, containerWidth, 62);
  ctx.fillStyle = label === 'CONCEPT' ? color : '#0B1A25';
  ctx.fillText(label, x + 18, y + 37);
}
ctx.fillStyle = '#EEF1EF';
ctx.font = 'bold 24px sans-serif';
ctx.fillText('Career evidence + VELYQUA', 72, 536);
ctx.fillStyle = '#AFC0C8';
ctx.font = '19px sans-serif';
ctx.fillText('authority-engine-app.vercel.app', 72, 575);
ctx.fillStyle = '#C2432B';
ctx.fillRect(1048, 515, 80, 64);
ctx.strokeStyle = '#FFFFFF';
ctx.lineWidth = 4;
ctx.beginPath(); ctx.moveTo(1072, 557); ctx.lineTo(1104, 531); ctx.moveTo(1083, 531); ctx.lineTo(1104, 531); ctx.lineTo(1104, 551); ctx.stroke();

const buffer = canvas.toBuffer('image/png');
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

fs.writeFileSync(path.join(publicDir, 'og-preview.png'), buffer);
console.log('✅ Generated public/og-preview.png');
