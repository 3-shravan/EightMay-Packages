#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
const packagesDir = path.join(root, "packages");

// Check if inside workspace root
if (!fs.existsSync(path.join(root, "pnpm-workspace.yaml"))) {
  console.log("❌ Workspace root NOT detected.");
  console.log("Run this command ONLY from the workspace root.");
  process.exit(1);
}

// Collect all package folders
const packages = fs.readdirSync(packagesDir).filter((dir) => {
  const full = path.join(packagesDir, dir);
  return fs.lstatSync(full).isDirectory();
});

// 1️⃣ Ensure each package has NO node_modules
console.log("🔍 Scanning for illegal node_modules folders...\n");

let removed = 0;

for (const pkg of packages) {
  const pkgPath = path.join(packagesDir, pkg);
  const nmPath = path.join(pkgPath, "node_modules");

  if (fs.existsSync(nmPath)) {
    console.log(`⚠️  Removing illegal node_modules in: ${pkg}`);
    execSync(`rimraf "${nmPath}"`);
    removed++;
  }
}

if (removed === 0) console.log("✅ No illegal node_modules found.\n");
else console.log(`🧹 Cleaned ${removed} invalid node_modules folders.\n`);

// 2️⃣ Prevent installation inside packages
if (process.env.INIT_CWD && !process.env.INIT_CWD.endsWith("eightmay")) {
  console.log("❌ Do NOT run npm/pnpm install inside package folders!");
  console.log("Run installation only from workspace root.");
  process.exit(1);
}

// 3️⃣ Ensure workspace packages resolve correctly
console.log("🔍 Verifying workspace detection...\n");

let detected = 0;

try {
  const result = execSync("pnpm ls -w --depth -1 --json", {
    encoding: "utf8",
  });
  const parsed = JSON.parse(result);

  parsed.forEach((pkg) => {
    if (pkg.path.includes("packages")) detected++;
  });
} catch (err) {
  console.log("❌ Could not verify workspace packages.");
  process.exit(1);
}

if (detected === 0) {
  console.log("❌ pnpm cannot detect your workspace packages!");
  console.log("Check pnpm-workspace.yaml format immediately.\n");
  process.exit(1);
}

console.log(`✅ Workspace packages detected: ${detected}`);
console.log("✨ Workspace Guard checks completed successfully.\n");
