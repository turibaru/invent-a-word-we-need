// mirrorlag names the brief flicker when a shop window shows a stranger.
// This script reads the finished entry beside itself, never from the caller.
// It copies the entry byte-for-byte so the gate sees exactly 86 characters.
// Only a non-empty entry of at most 140 characters may reach the output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(scriptDir, "entry.txt"), "utf-8");

if (!entry.trim() || entry.length > 140) {
  console.error("entry.txt must be non-empty and at most 140 characters.");
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set.");
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), entry, "utf-8");
