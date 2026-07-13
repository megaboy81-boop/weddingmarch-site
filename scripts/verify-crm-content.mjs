import { readFileSync } from 'node:fs';

const path = new URL('../src/data/crm-website-content.json', import.meta.url);
const data = JSON.parse(readFileSync(path, 'utf8'));
const fail = (message) => {
  console.error(`crm-content: ${message}`);
  process.exitCode = 1;
};

if (data.schemaVersion !== 1) fail('schemaVersion must be 1');
if (typeof data.revision !== 'string' || !/^[A-Za-z0-9._:-]{1,96}$/.test(data.revision)) fail('invalid revision');
for (const key of ['intro', 'prices', 'refund', 'hours', 'notice', 'channels']) {
  if (!data[key] || typeof data[key] !== 'object' || typeof data[key].enabled !== 'boolean') fail(`invalid ${key}`);
}
if (!Array.isArray(data.approvedSections) || data.approvedSections.some((key) => !['intro', 'price', 'refund', 'hours', 'notice', 'channels'].includes(key))) {
  fail('invalid approvedSections');
}
if (!Array.isArray(data.prices?.items) || data.prices.items.length > 20) fail('invalid prices.items');
for (const item of data.prices?.items ?? []) {
  if (typeof item.label !== 'string' || item.label.trim().length < 1 || item.label.length > 80) fail('invalid price label');
  if (!Number.isSafeInteger(item.amount) || item.amount <= 0 || item.amount > 100_000_000) fail('invalid price amount');
}
if (data.channels?.phone && !/^[0-9+()\-\s]{7,24}$/.test(data.channels.phone)) fail('invalid phone');

if (!process.exitCode) console.log(`crm-content: PASS (${data.revision})`);
