import http from 'node:http';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const serverProcess = spawn(process.execPath, [
  path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next'),
  'start',
  '-p',
  '3008',
], {
  cwd: projectRoot,
  stdio: 'ignore',
});

function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: 'ERROR: ' + err.message });
    });
  });
}

async function run() {
  console.log('Waiting for Next.js server on port 3008...');
  await new Promise((r) => setTimeout(r, 4000));

  const routes = [
    '/',
    '/kalla',
    '/bala',
    '/positions',
    '/positions/kalla-19-79',
    '/positions/kalla-26-62',
    '/positions/bala-7-172',
    '/positions/bala-67-9',
    '/quiz',
    '/memorize',
    '/cards',
    '/progress',
    '/glossary',
    '/disagreements',
    '/manzuma',
    '/sources',
    '/sitemap.xml',
    '/robots.txt',
  ];

  let allPassed = true;
  for (const r of routes) {
    const res = await checkUrl(`http://localhost:3008${r}`);
    console.log(`[HTTP ${res.status}] ${r}`);
    if (res.status !== 200) allPassed = false;
  }

  serverProcess.kill('SIGTERM');
  if (allPassed) {
    console.log('\n🎉 ALL ROUTES RETURNED HTTP 200 OK!');
    process.exit(0);
  } else {
    console.error('\n❌ Some routes failed!');
    process.exit(1);
  }
}

run();
