import fs from "fs";
import path from "path";
import prompts from "prompts";

/* ───────────────────────────────────────────
   1. Ask user what package type to create
──────────────────────────────────────────── */
const answers = await prompts([
  {
    type: "select",
    name: "type",
    message: "What do you want to create?",
    choices: [
      { title: "🔵 Hook", value: "hook" },
      { title: "🟢 Utility", value: "utility" },
      { title: "🟣 Component", value: "component" },
    ],
  },
  {
    type: "text",
    name: "name",
    message: "Enter package name (e.g., useDebounce, formatDate, Button):",
    validate(value) {
      return value.trim() ? true : "Name is required";
    },
  },
]);

const type = answers.type;
const pkgName = answers.name.trim();

console.log(`\n🚀 Creating new ${type}: ${pkgName}`);

/* ───────────────────────────────────────────
   2. Create folder
──────────────────────────────────────────── */
const root = path.resolve(process.cwd(), "packages");
const newFolder = path.join(root, pkgName);

if (fs.existsSync(newFolder)) {
  console.error(`❌ Package "${pkgName}" already exists`);
  process.exit(1);
}

fs.mkdirSync(newFolder);

/* ───────────────────────────────────────────
   3. package.json (your existing working setup)
──────────────────────────────────────────── */
const packageJson = {
  name: `@eightmay/${pkgName}`,
  version: "1.0.0",
  description:
    type === "hook"
      ? "Lightweight React hook"
      : type === "utility"
      ? "Utility function"
      : "Reusable React component",
  main: "dist/index.cjs",
  module: "dist/index.js",
  types: "dist/index.d.ts",
  files: ["dist"],
  peerDependencies:
    type === "hook" || type === "component" ? { react: ">=18" } : {},
  scripts: {
    build: "rimraf dist && rollup -c",
    prepack: "pnpm run build",
  },
};

fs.writeFileSync(
  path.join(newFolder, "package.json"),
  JSON.stringify(packageJson, null, 2)
);

/* ───────────────────────────────────────────
   4. tsconfig.json
──────────────────────────────────────────── */
const tsconfig = {
  extends: "../../tsconfig.base.json",
  compilerOptions: {
    declaration: false,
    emitDeclarationOnly: false,
    declarationMap: false,
    skipLibCheck: true,
  },
  include: ["src"],
};

fs.mkdirSync(path.join(newFolder, "src"));
fs.writeFileSync(
  path.join(newFolder, "tsconfig.json"),
  JSON.stringify(tsconfig, null, 2)
);

/* ───────────────────────────────────────────
   5. rollup.config.mjs (FIXED + PROTECTED)
──────────────────────────────────────────── */
const rollupConfig = `
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import dts from "rollup-plugin-dts";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

export default [
  {
    input: "src/index.ts",

    // 🔥 Only peer deps allowed
    external: [...Object.keys(pkg.peerDependencies || {})],

    output: [
      { file: pkg.module, format: "esm" },
      { file: pkg.main, format: "cjs", exports: "auto" }
    ],
    plugins: [
      json(),
      resolve({ preferBuiltins: true }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        declarationMap: false,
        emitDeclarationOnly: false
      })
    ]
  },

  {
    input: "src/index.ts",
    output: [{ file: pkg.types, format: "es" }],
    plugins: [dts()]
  }
];
`;

fs.writeFileSync(path.join(newFolder, "rollup.config.mjs"), rollupConfig);

/* ───────────────────────────────────────────
   6. Template for src/index.ts
──────────────────────────────────────────── */
const templates = {
  hook: `
export function ${pkgName}() {
  // TODO: implement your hook logic
  return {};
}
`,

  utility: `
export function ${pkgName}() {
  // TODO: implement utility logic
  return null;
}
`,

  component: `
import React from "react";

export function ${pkgName}() {
  return <div>${pkgName} component</div>;
}
`,
};

fs.writeFileSync(path.join(newFolder, "src/index.ts"), templates[type]);

/* ───────────────────────────────────────────
   7. HARD PROTECTION FILES
──────────────────────────────────────────── */

// 7A: .npmrc (blocks installs)
fs.writeFileSync(
  path.join(newFolder, ".npmrc"),
  `ignore-scripts=true
package-lock=false
auto-install-peers=false
save=false
save-exact=true
packageManager=forbidden
`
);

// 7B: .gitignore
fs.writeFileSync(
  path.join(newFolder, ".gitignore"),
  `node_modules
dist
`
);

// 7C: .npmignore
fs.writeFileSync(
  path.join(newFolder, ".npmignore"),
  `node_modules
src
rollup.config.mjs
tsconfig.json
`
);

/* ───────────────────────────────────────────
   8. Update aggregator ONLY for hooks
──────────────────────────────────────────── */
if (type === "hook") {
  const hooksIndex = path.resolve(process.cwd(), "packages/hooks/src/index.ts");
  let content = fs.readFileSync(hooksIndex, "utf8");
  content += `\nexport { ${pkgName} } from "@eightmay/${pkgName}";`;
  fs.writeFileSync(hooksIndex, content);
  console.log(`✨ Added export to @eightmay/hooks`);
}

console.log(`✨ Package created: packages/${pkgName}`);
console.log("🎉 All done!\n");
