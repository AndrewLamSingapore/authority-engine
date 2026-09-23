/**
 * Regression guard for the clean -> build -> clean invariant.
 *
 * A build that rewrites tracked files makes "working tree is clean" an
 * unreliable signal for every other check on this repository. This script
 * fails if the repository is dirty before the build, or if the build leaves it
 * dirty afterwards.
 *
 * Run from a clean tree:  npm run check:clean-build
 */
import { execFileSync } from 'node:child_process';

function gitStatus() {
  return execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim();
}

const before = gitStatus();
if (before) {
  console.error('❌ Working tree is not clean before the build:\n' + before);
  process.exit(1);
}

execFileSync('npm', ['run', 'build'], { stdio: 'inherit', shell: true });

const after = gitStatus();
if (after) {
  console.error('❌ The build dirtied the working tree:\n' + after);
  process.exit(1);
}

console.log('✅ Clean → build → clean invariant holds.');
