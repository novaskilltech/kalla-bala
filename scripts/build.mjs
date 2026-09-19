import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// 1. Run Data Validation
console.log('--- Step 1: Validating Quranic dataset ---');
execSync(`node "${path.join(__dirname, 'validate-data.mjs')}"`, {
  cwd: projectRoot,
  stdio: 'inherit',
});

// 2. Run Next.js Build
console.log('\n--- Step 2: Building Next.js production bundle ---');
const env = { ...process.env };

if (process.platform === 'win32') {
  const patchPath = path.join(__dirname, 'patch-node.cjs').replace(/\\/g, '/');
  env.NODE_OPTIONS = `${process.env.NODE_OPTIONS || ''} -r "${patchPath}"`.trim();
}

const nextBin = path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next');

execSync(`node "${nextBin}" build`, {
  cwd: projectRoot,
  env,
  stdio: 'inherit',
});

console.log('\n✅ Build completed successfully!');
