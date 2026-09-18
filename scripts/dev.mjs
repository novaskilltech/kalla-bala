import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const patchPath = path.join(__dirname, 'patch-node.cjs').replace(/\\/g, '/');
const nextBin = path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next').replace(/\\/g, '/');

const env = {
  ...process.env,
  NODE_OPTIONS: `${process.env.NODE_OPTIONS || ''} -r "${patchPath}"`.trim(),
};

const child = spawn(process.execPath, [nextBin, 'dev'], {
  cwd: projectRoot,
  env,
  stdio: 'inherit',
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
