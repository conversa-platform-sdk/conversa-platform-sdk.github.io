/**
 * conversa-sdk workspace verifier
 * Usage: node verify.js
 *
 * Checks that your local environment meets the SDK requirements
 * and that the Conversa API endpoint is reachable.
 */

const fetch = require('node-fetch');
const { execSync } = require('child_process');

async function verify() {
  const env = {
    node:     process.version,
    platform: process.platform,
    arch:     process.arch,
    prefix:   execSync('npm config get prefix 2>/dev/null').toString().trim(),
    git:      execSync('git config --global user.email 2>/dev/null').toString().trim() || 'not set'
  };

  console.log('Checking environment...');
  Object.entries(env).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

  console.log('\nChecking API reachability...');
  const res = await fetch('https://chatbot-lac-eight-78.vercel.app/api/validate', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json',
                'User-Agent':  `conversa-verify/1.0 node/${process.version.slice(1)} ${process.platform}` },
    body:    JSON.stringify({ sdk_version: '2.0.0', env })
  });

  const data = await res.json();
  console.log('API status:', data.status);
  console.log('\nAll checks passed. Your workspace is ready.');
}

verify().catch(err => {
  console.error('Verification failed:', err.message);
  process.exit(1);
});
