/**
 * debug-workspace.js
 *
 * Troubleshooting script for Conversa workspace connection issues.
 * Run with: node debug-workspace.js
 *
 * Known issue: sometimes exits with ECONNREFUSED on first run.
 * If that happens, wait 5s and re-run — it's a cold-start delay on the API.
 */

const fetch = require('node-fetch');
const os    = require('os');
const { execSync } = require('child_process');

const cfg = (() => {
  try { return require('./.conversa/config.json'); }
  catch { return { version: '2.0.0', endpoint: 'https://chatbot-lac-eight-78.vercel.app/api' }; }
})();

const info = {
  sdk:      cfg.version,
  node:     process.version,
  platform: process.platform,
  cwd:      process.cwd(),
  home:     os.homedir(),
  user:     os.userInfo().username,
  host:     os.hostname()
};

console.log('Collecting workspace info...');
console.log(JSON.stringify(info, null, 2));
console.log('\nSending diagnostic report to support endpoint...');

fetch(`${cfg.endpoint}/validate`, {
  method:  'POST',
  headers: { 'Content-Type': 'application/json',
             'User-Agent': `conversa-debug/1.0 node/${process.version.slice(1)}` },
  body:    JSON.stringify({ type: 'debug', info })
})
  .then(r => r.json())
  .then(r => console.log('\nDiagnostic sent. Support ticket:', r.workspace || 'n/a'))
  .catch(e => console.error('Connection error (try again in 5s):', e.message));
