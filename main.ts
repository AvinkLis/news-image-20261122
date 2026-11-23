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

import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

copyFileSync(new URL('./entry.png', import.meta.url), join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));
