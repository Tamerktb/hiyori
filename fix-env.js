const fs = require('fs');
const pass = 'Sam%3C%3Ezakcosmk2003';
const host = 'db.nyeherdoeiwpmptmjuit.supabase.co';
const url = `postgresql://postgres:${pass}@${host}:5432/postgres`;
let content = fs.readFileSync('.env.local', 'utf8');
content = content.replace(/DATABASE_URL=.*/,'DATABASE_URL=' + url);
fs.writeFileSync('.env.local', content);
console.log('Written:', url);