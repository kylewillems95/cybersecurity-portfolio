import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resumeJson } from './export-resume.mjs';

const hash = data => createHash('sha256').update(data).digest('hex');
const manifest = JSON.parse(await readFile(new URL('./resume-manifest.json', import.meta.url), 'utf8'));
if (hash(resumeJson) !== manifest.sourceSha256) throw new Error('Resume text changed: regenerate and visually review the PDF/HTML resume.');
for (const [path, expected] of Object.entries(manifest.assets)) {
  if (hash(await readFile(new URL('../' + path, import.meta.url))) !== expected) throw new Error(`Resume asset changed without review: ${path}`);
}
console.log('Resume sync check passed: public data, reviewed PDF, HTML, and CSS match the recorded source.');
