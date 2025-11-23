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
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      ...Object.keys(pkg.dependencies || {}),
    ],
    output: [
      { file: pkg.module, format: "esm" },
      { file: pkg.main, format: "cjs", exports: "auto" },
    ],
    plugins: [
      json(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        declarationMap: false,
        emitDeclarationOnly: false,
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: pkg.types, format: "es" }],
    plugins: [dts()],
  },
];
