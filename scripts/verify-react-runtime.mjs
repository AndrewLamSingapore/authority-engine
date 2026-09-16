import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const react = require('react/package.json').version;
const reactDOM = require('react-dom/package.json').version;
if (react !== reactDOM) {
  throw new Error(`React runtime mismatch: react ${react}, react-dom ${reactDOM}. Install the exact same version of both before deploying.`);
}
// Exercise the renderer too: a successful bundle alone does not prove compatibility.
const { createElement } = await import('react');
const { renderToStaticMarkup } = await import('react-dom/server');
if (renderToStaticMarkup(createElement('span', null, 'runtime ready')) !== '<span>runtime ready</span>') {
  throw new Error('React renderer smoke check failed');
}
console.log(`React and React DOM ${react}: renderer verified`);
