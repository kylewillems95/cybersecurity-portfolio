import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { resumeSections, projects } from '../src/content.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const text = JSON.stringify({ resumeSections, projects });
const draftingNotes = /case study in preparation|will be added after review|the next case-study revision|the case study will document|public resume in review|downloadable PDF will follow/i;
assert(!draftingNotes.test(text), 'Remove drafting placeholders from public content');
assert(!/(?:docs|drive)\.google\.com|@gmail\.com|active secret|clearance|u\.s\. citizen/i.test(text), 'Public content contains unreviewed private details');

const ids = [...resumeSections, ...projects].map(item => item.id);
assert.equal(new Set(ids).size, ids.length, 'Content IDs must be unique across resume and projects');
for (const id of ids) assert(/^[a-z][a-z0-9-]*$/.test(id), `Invalid anchor ID: ${id}`);
assert(projects.length > 0 && resumeSections.length > 0, 'Resume and projects cannot be empty');

for (const project of projects) {
  assert(project.title && project.summary && project.status, `Project ${project.id} needs a title, summary, and status`);
  assert(project.sections?.length >= 2, `Project ${project.id} needs substantive case-study sections`);
  for (const section of [...project.sections, ...(project.detailSections ?? [])]) {
    assert(section.title && (section.body?.trim() || section.bullets?.length), `Empty case-study section in ${project.id}`);
  }
  if (project.link) {
    const url = new URL(project.link.url);
    assert.equal(url.protocol, 'https:', `Project link must use HTTPS: ${project.id}`);
    assert(!url.username && !url.password && !url.search, `Project link includes credentials or query parameters: ${project.id}`);
    assert(!/example\.(?:com|org)|localhost|\.invalid$/.test(url.hostname), `Placeholder project URL: ${project.id}`);
  }
}

const home = projects.find(project => project.id === 'home-soc');
assert(home && /in progress/i.test(home.status), 'Home SOC completion status needs evidence before it can change');
assert(/Windows.*(?:in progress|remain|next)/is.test(JSON.stringify(home)), 'Home SOC must preserve unfinished Windows work');
const experience = resumeSections.find(section => section.id === 'experience');
assert(experience?.entries.some(entry => entry.bullets?.length === 5), 'Protected Army experience must include all five source bullets');
const army = experience.entries[0];
const armyDigest = createHash('sha256').update(JSON.stringify({ title: army.title, bullets: army.bullets })).digest('hex');
assert.equal(armyDigest, 'e01fa59f3f4d7183cc13ebddeb43615bbe8d32706deda20f129aa6a292940fff', 'Protected Army header or bullets changed from the November master; review is required');
const certifications = resumeSections.find(section => section.id === 'certifications');
for (const credential of certifications?.entries || []) {
  if (/CySA\+|Linux\+/.test(credential.title)) {
    assert(/in progress|studying|not earned/i.test(credential.meta || ''), `${credential.title} must retain its incomplete status`);
  }
}
const education = resumeSections.find(section => section.id === 'education');
const wgu = education?.entries.find(entry => /Western Governors University/.test(entry.title));
assert(/accepted|January 2027/i.test(JSON.stringify(wgu)), 'WGU must retain its future-start status');

const pdf = await readFile(path.join(root, 'public', 'resume', 'Kyle_Willems_Resume.pdf'));
assert.equal(pdf.subarray(0, 5).toString('ascii'), '%PDF-', 'Resume download must be a real PDF');
assert(pdf.length > 1000 && pdf.length < 1_000_000, 'Resume PDF has an unexpected file size');
await stat(path.join(root, 'public', 'images', 'nova-desktop.jpg'));
console.log(`Content checks passed: ${projects.length} project case studies, unique anchors, protected experience, credential boundaries, and a PDF download.`);
console.log('External link availability and PDF content/layout are reviewed separately; this check does not make network requests.');
