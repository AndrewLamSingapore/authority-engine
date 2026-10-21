import test from 'node:test';
import assert from 'node:assert/strict';
import { compile } from '@tailwindcss/node';
import { fileURLToPath } from 'node:url';

const base = fileURLToPath(new URL('../src/', import.meta.url));
async function compileUtilities(candidates) {
  const compiler = await compile('@import "./index.css";', { base, onDependency() {} });
  return compiler.build(candidates);
}

test('Tailwind compiles responsive and hover utilities through the current CSS entry', async () => {
  const css = await compileUtilities(['text-white', 'hover:bg-black', 'md:flex']);
  assert.ok(/\.text-white\s*\{/.test(css), 'text utility is emitted');
  assert.ok(/\.hover\\:bg-black:hover\s*\{/.test(css), 'escaped hover utility is emitted');
  assert.ok(/@media\s*\(hover:\s*hover\)/.test(css), 'hover variant retains its pointer capability guard');
  assert.ok(/@media\s*\(width\s*>=\s*48rem\)/.test(css), 'md breakpoint remains 768px at the 16px initial font');
  assert.ok(/\.md\\:flex\s*\{/.test(css) && /display:\s*flex/.test(css), 'responsive flex is emitted');
});

test('Legacy palette, small radius, shadow and forced-color outline semantics remain explicit', async () => {
  const css = await compileUtilities(['text-slate-300', 'rounded-sm', 'shadow-sm', 'outline-none']);
  assert.ok(/--color-slate-300:\s*#cbd5e1/.test(css), 'existing slate token is preserved');
  assert.ok(/--radius-sm:\s*0\.125rem/.test(css), 'existing small radius is preserved');
  assert.ok(/--tw-shadow:\s*0 1px 2px 0 var\(--tw-shadow-color, rgb\(0 0 0 \/ 0\.05\)\)/.test(css), 'existing small shadow is preserved');
  assert.ok(/outline:\s*2px solid transparent/.test(css) && /outline-offset:\s*2px/.test(css), 'legacy forced-color outline fallback is preserved');
});
test('Measured v3 spacing, radius and responsive typography preserve existing page geometry', async () => {
  const css = await compileUtilities(['space-y-6', 'rounded-full', 'sm:text-6xl', 'leading-[.94]', 'divide-y', 'divide-white/10']);
  const compact = css.replace(/\s+/g, '');
  assert.ok(compact.includes('.divide-y>:not([hidden])~:not([hidden])'), 'dividers stay on following visible children');
  assert.ok(compact.includes('.space-y-6>:not([hidden])~:not([hidden])'), 'hidden-child-aware spacing selector remains');
  assert.ok(/margin-top:\s*calc\(1\.5rem/.test(css), 'spacing stays on the following child');
  assert.ok(!css.includes('margin-block-end:'), 'v4 previous-child spacing does not coexist with legacy spacing');
  assert.ok(/\.rounded-full\s*\{\s*border-radius:\s*9999px;?\s*\}/.test(css), 'full-radius token remains exact');
  assert.ok(/\.sm\\:text-6xl\s*\{\s*font-size:\s*3\.75rem;\s*line-height:\s*1/.test(css), 'responsive text preserves its measured line height');
});