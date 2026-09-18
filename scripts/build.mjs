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

// 2. Run Next.js Build with Node 22 Windows libuv fix
console.log('\n--- Step 2: Building Next.js production bundle ---');
const patchPath = path.join(__dirname, 'patch-node.cjs').replace(/\\/g, '/');
const nextBin = path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next').replace(/\\/g, '/');

const env = {
  ...process.env,
  NODE_OPTIONS: `${process.env.NODE_OPTIONS || ''} -r "${patchPath}"`.trim(),
};

execSync(`node "${nextBin}" build`, {
  cwd: projectRoot,
  env,
  stdio: 'inherit',
});

console.log('\n✅ Build completed successfully!');
