import test from 'node:test';
import assert from 'node:assert/strict';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

test('Tailwind builds responsive and pseudo-class utilities with the patched selector parser', async () => {
  const result = await postcss([
    tailwindcss({
      content: [{ raw: '<article class="text-white hover:bg-black md:flex"></article>', extension: 'html' }],
    }),
    autoprefixer,
  ]).process('@tailwind base; @tailwind components; @tailwind utilities;', { from: undefined });

  assert.match(result.css, /\.text-white\s*\{/);
  assert.match(result.css, /\.hover\\:bg-black:hover\s*\{/);
  assert.match(result.css, /@media\s*\(min-width:\s*768px\)/);
  assert.match(result.css, /\.md\\:flex\s*\{\s*display:\s*flex/);
  assert.deepEqual(result.warnings(), []);
});
