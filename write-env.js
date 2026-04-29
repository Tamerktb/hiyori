const fs = require('fs');
const at = String.fromCharCode(64);
const url = 'postgresql://postgres:Sam%3C%3Ezakcosmk2003' + at + 'db.nyeherdoeiwpmptmjuit.supabase.co:5432/postgres';

let env = fs.readFileSync('.env.local', 'utf8');

// Remove any corrupted DATABASE_URL line
env = env.split('\n').filter(l => !l.startsWith('DATABASE_URL=')).join('\n');

// Add clean one
env += '\nDATABASE_URL=' + url + '\n';

fs.writeFileSync('.env.local', env);
console.log('SUCCESS. URL =', url);