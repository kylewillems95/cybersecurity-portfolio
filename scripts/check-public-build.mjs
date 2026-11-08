import { readdir, readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const siteRoot = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(siteRoot, 'dist');
const resumeFile = 'resume/Kyle_Willems_Resume.pdf';
const requiredFiles = [
  'index.html',
  'projects/nova-serenity/index.html',
  'projects/home-soc/index.html',
  'resume/index.html',
  resumeFile,
];
const forbiddenText = [
  ['private document links', /(?:docs|drive)\.google\.com/i],
  ['personal Gmail addresses', /[\w.+-]+@gmail\.com/i],
  ['phone links', /tel:\+?[\d()-]+/i],
  ['clearance or citizenship details', /active secret|clearance|u\.s\. citizen/i],
  ['private host addresses', /\b(?:192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})\b/],
  ['embedded private keys', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['local source paths', /\b[A-Z]:[\\/]{1,2}Users[\\/]{1,2}|file:\/\/\//i],
  ['drafting notes', /case study in preparation|will be added after review|downloadable PDF will follow|content under review/i],
];
const errors = [];
const files = [];
async function inspect(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) {
      errors.push(`Unexpected symlink: ${entry.name}`);
    } else if (entry.isDirectory()) {
      await inspect(file);
    } else {
      const relative = path.relative(dist, file).split(path.sep).join('/');
      files.push(relative);
      if (!/\.(?:html|js|css|svg|jpg|png|webp)$/.test(entry.name) && relative !== resumeFile) {
        errors.push(`Unexpected public file type: ${relative}`);
      }
      if (relative === resumeFile) {
        const bytes = await readFile(file);
        if (bytes.subarray(0, 5).toString('ascii') !== '%PDF-') errors.push('Resume download is not a PDF');
      }
      if (/\.(?:html|js|css|svg)$/.test(entry.name)) {
        const text = await readFile(file, 'utf8');
        for (const [label, pattern] of forbiddenText) {
          if (pattern.test(text)) errors.push(`Review ${label} in ${relative}`);
        }
      }
      if ((await stat(file)).size > 1_000_000) errors.push(`Oversized asset: ${relative}`);
    }
  }
}
await inspect(dist);
for (const file of requiredFiles) {
  if (!files.includes(file)) errors.push(`Missing public build file: ${file}`);
}
if (errors.length) {
  for (const error of errors) console.error(error);
  process.exitCode = 1;
} else {
  console.log(`Public-build check passed: ${files.length} intended static assets; no flagged private data or source maps.`);
  console.log('The PDF is allowlisted by path and file signature. Its text, metadata, and page layout require separate review.');
}
