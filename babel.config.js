// babel.config.js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }], // For current Node.js version
    "@babel/preset-react", // For React JSX syntax
    "@babel/preset-typescript", // For TypeScript syntax
  ],
};
