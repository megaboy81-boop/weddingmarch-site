import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const serverDirectory = fileURLToPath(new URL('../dist/server/', import.meta.url));
const workerSource = fileURLToPath(new URL('../worker/sites-static-worker.mjs', import.meta.url));
const workerOutput = fileURLToPath(new URL('../dist/server/index.js', import.meta.url));

await mkdir(serverDirectory, { recursive: true });
await copyFile(workerSource, workerOutput);

console.log(`Prepared Sites worker in ${projectRoot}dist/server/index.js`);
