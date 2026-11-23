// Entry for make.fun news-image-20261122: "Sum up 22 November's world news in one image."
// The image beside this file (entry.png, 1024x1024) is a newspaper front page for Sunday,
// 22 November 2026, built for this entry: COP31 talks collapse in Antalya (lead), Ukrainian
// sea drones hit a Russian warship in Libya, tankers struck near Hormuz, the ICJ rules Myanmar
// committed genocide against the Rohingya, missile strikes on Ukraine, and cartel leader
// 'El Chapo Isidro' captured in Mexico. The program copies that image to /output/entry.png.
//
// A working news-image-daily entry (Node 22, standard library only): its image is the entry.png beside this file, and
// the program copies it to /output/entry.png. A starting point, not a winner: replace the image. The gate takes a
// whole PNG or JPEG of at most 1 MiB and 1024 by 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);

// Validate entry.png before copying: it must be a real PNG whose IHDR chunk
// declares exactly 1024x1024 pixels, as the competition gate requires.
const bytes = readFileSync(source);
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function fail(message: string): never {
  console.error(`main.ts: invalid entry.png — ${message}`);
  process.exit(1);
}

if (bytes.length < 24) {
  fail(`file is only ${bytes.length} bytes, too small to contain a PNG signature and IHDR chunk`);
}
for (let i = 0; i < PNG_SIGNATURE.length; i++) {
  if (bytes[i] !== PNG_SIGNATURE[i]) {
    fail('missing PNG magic bytes (89 50 4E 47 0D 0A 1A 0A) at the start of the file');
  }
}
const firstChunkType = bytes.toString('ascii', 12, 16);
if (firstChunkType !== 'IHDR') {
  fail(`first chunk after the PNG signature is "${firstChunkType}", expected "IHDR"`);
}
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  fail(`IHDR dimensions are ${width}x${height}, expected exactly 1024x1024`);
}

copyFileSync(source, join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));
