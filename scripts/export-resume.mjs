import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resumeSections } from '../src/content.js';

export const resumeData = {
  name: 'Kyle Willems',
  headline: 'Cybersecurity | Systems Administration | IT Support | Information Assurance',
  linkedIn: 'https://www.linkedin.com/in/kyle-willems',
  version: 'November 2026',
  sections: resumeSections,
};
export const resumeJson = JSON.stringify(resumeData, null, 2) + '\n';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await mkdir(new URL('../.cache/', import.meta.url), { recursive: true });
  await writeFile(new URL('../.cache/resume.json', import.meta.url), resumeJson);
  console.log('Exported public resume content for PDF/HTML generation.');
}
