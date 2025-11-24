// import fs from "fs";
// import path from "path";

// const root = process.cwd();
// const packagesDir = path.join(root, "packages");

// console.log("🔍 Running workspace guard...");

// let removed = 0;

// for (const pkg of fs.readdirSync(packagesDir)) {
//   const pkgPath = path.join(packagesDir, pkg);
//   const nodeModules = path.join(pkgPath, "node_modules");

//   if (fs.existsSync(nodeModules)) {
//     console.log(`⚠️  Removing nested node_modules → ${pkg}`);
//     fs.rmSync(nodeModules, { recursive: true, force: true });
//     removed++;
//   }
// }

// if (removed === 0) {
//   console.log("✅ No nested node_modules found.");
// }

// console.log("🛡️ Workspace guard complete.\n");


import fs from "fs";
import path from "path";

const root = process.cwd();
const packagesDir = path.join(root, "packages");

console.log("🛡️  Running HARD workspace guard...");

// Scan for illegal node_modules
let invalid = [];

for (const pkg of fs.readdirSync(packagesDir)) {
  const pkgPath = path.join(packagesDir, pkg);
  const nm = path.join(pkgPath, "node_modules");

  if (fs.existsSync(nm)) {
    invalid.push(pkg);
  }
}

// 1) HARD FAIL if any nested node_modules exists
if (invalid.length > 0) {
  console.error("❌ ILLEGAL node_modules detected in:");
  invalid.forEach((p) => console.error("   - " + p));

  console.error("\n🛑 STOP! Nested node_modules are not allowed in this monorepo.");
  console.error("💡 Fixing automatically...");

  invalid.forEach((p) => {
    const nm = path.join(packagesDir, p, "node_modules");
    fs.rmSync(nm, { recursive: true, force: true });
    console.log(`✔ Removed packages/${p}/node_modules`);
  });

  console.log("\n✔ All illegal folders removed.");
}
else {
  console.log("✔ No illegal node_modules folders detected.");
}

// 2) Prevent running install outside root
if (process.cwd() !== root) {
  console.error("❌ You must run pnpm install ONLY from project root.");
  process.exit(1);
}

console.log("🛡️  HARD guard completed.\n");
