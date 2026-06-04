const { cpSync, existsSync } = require('fs');

const src = 'assets';
const dst = 'dist/assets';

if (existsSync(src)) {
  cpSync(src, dst, { recursive: true });
  console.log(`Assets copied: ${src} -> ${dst}`);
}
