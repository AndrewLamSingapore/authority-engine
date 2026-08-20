import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background
ctx.fillStyle = '#080F0E';
ctx.fillRect(0, 0, width, height);

// Accent Border Top
ctx.fillStyle = '#10B981';
ctx.fillRect(0, 0, width, 8);

// Title
ctx.fillStyle = '#FFFFFF';
ctx.font = 'bold 58px sans-serif';
ctx.fillText('Andrew Lam', 80, 245);
ctx.fillText('Operations Excellence × Analytics', 80, 315);

// Subtitle
ctx.fillStyle = '#10B981';
ctx.font = '28px sans-serif';
ctx.fillText('20+ years of operations experience. Evidence-led decisions.', 80, 380);

const buffer = canvas.toBuffer('image/png');
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

fs.writeFileSync(path.join(publicDir, 'og-preview.png'), buffer);
console.log('✅ Generated public/og-preview.png');
