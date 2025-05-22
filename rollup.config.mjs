import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import fs from "fs"; // Import Node.js file system module
import path from "path"; // Import Node.js path module
import { fileURLToPath } from "url"; // Import for __dirname equivalent in ES modules

// Get the current directory name in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json content using fs and parse it
const packageJsonPath = path.resolve(__dirname, "./package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(), // Excludes peer dependencies from the bundle
      resolve(), // Resolves node modules
      commonjs(), // Converts CommonJS modules to ES6
      typescript({ tsconfig: "./tsconfig.json" }), // Compiles TypeScript
    ],
    external: ["react", "react-dom"], // Mark React and ReactDOM as external
  },
  {
    input: "dist/index.d.ts", // Input for type definitions
    output: [{ file: packageJson.types, format: "esm" }],
    plugins: [dts()], // Generates type declaration bundles
  },
];
