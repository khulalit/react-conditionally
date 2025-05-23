# react-conditionally

<!-- [![npm version](https://badge.fury.io/js/react-conditionally.svg)](https://www.npmjs.com/package/react-conditionally) -->

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/--TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<!-- [![NPM Downloads](https://img.shields.io/npm/dm/react-conditionally)](https://www.npmjs.com/package/react-conditionally) -->

---

## 🚀 Declarative Conditional Rendering for React

`react-conditionally` is a lightweight and intuitive library that provides declarative components for handling conditional rendering in your React applications. Say goodbye to deeply nested ternary operators and complex `&&` chains, and embrace cleaner, more readable JSX.

---

## ✨ Features

- **`<IfElse>` Wrapper:** A powerful wrapper component that orchestrates your conditional logic.
- **`<If>` Component:** Renders content only if its `condition` prop is `true`.
- **`<ElIf>` Component:** (Else If) Renders content if its `condition` is `true` **AND** all preceding `If`/`ElIf` conditions within the same `<IfElse>` block were `false`.
- **`<Else>` Component:** Renders content if no preceding `If` or `ElIf` conditions within the same `<IfElse>` block were `true`.

---

## 📦 Installation

Install `react-conditionally` using npm or yarn:

```bash
npm install react-conditionally
# OR
yarn add react-conditionally

```

## 🤔 Why react-conditionally?

### While React's native JSX conditionals (&&, ? :) are powerful, they can lead to:

- Nested Ternary Hell: Deeply nested ? : can quickly become unreadable and hard to maintain.
- Verbose && Chains: Multiple && operators for else if logic can be awkward and less explicit.
- Lack of Structure: It can be hard to visually parse complex conditional blocks.

### react-conditionally offers:

- Improved Readability: Declarative components clearly indicate conditional blocks.
- Structural Clarity: Your JSX visually reflects the if-else if-else flow.
- Reduced Boilerplate: No need for manual wrapping of expressions for else conditions.

## 🤝 Contributing

We welcome contributions! Please see our CONTRIBUTING.md for guidelines on how to contribute to this project, report bugs, and suggest features.

## 📄 License

This project is licensed under the MIT License.
