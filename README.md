# react-if-then-else-switch

<!-- [![npm version](https://badge.fury.io/js/react-conditionally.svg)](https://www.npmjs.com/package/react-conditionally) -->

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/--TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<!-- [![NPM Downloads](https://img.shields.io/npm/dm/react-conditionally)](https://www.npmjs.com/package/react-conditionally) -->

---

## 🚀 Declarative Conditional Rendering for React

`react-if-then-else-switch` is a lightweight and intuitive library that provides declarative components for handling conditional rendering in your React applications. Say goodbye to deeply nested ternary operators and complex `&&` chains, and embrace cleaner, more readable JSX.

---

## ✨ Features

- **`<IfElse>` Wrapper:** A powerful wrapper component that orchestrates your conditional logic.
- **`<If>` Component:** Renders content only if its `condition` prop is `true`.
- **`<ElIf>` Component:** (Else If) Renders content if its `condition` is `true` **AND** all preceding `If`/`ElIf` conditions within the same `<IfElse>` block were `false`.
- **`<Else>` Component:** Renders content if no preceding `If` or `ElIf` conditions within the same `<IfElse>` block were `true`.
- **`<Switch>` Component:** A declarative container that evaluates a value prop against multiple `<Case>` conditions. Only the first matching `<Case>` (or the `<Default>`) will render.

- **`<Case>` Component:** Renders content if its condition prop (or a specific value prop, depending on your implementation) matches the value prop of the parent `<Switch>` component.

- **`<Default>` Component:** Renders content if no preceding `<Case>` components within the same `<Switch>` block had a matching condition. This acts as the fallback for a Switch statement.

---

## 📦 Installation

Install `react-if-then-else-switch` using npm or yarn:

```bash
npm install react-if-then-else-switch
# OR
yarn add react-if-then-else-switch

```

## 🤔 Why react-if-then-else-switch?

### While React's native JSX conditionals (&&, ? :) are powerful, they can lead to:

- Nested Ternary Hell: Deeply nested ? : can quickly become unreadable and hard to maintain.
- Verbose && Chains: Multiple && operators for else if logic can be awkward and less explicit.
- Lack of Structure: It can be hard to visually parse complex conditional blocks.

### react-if-then-else-switch offers:

- Improved Readability: Declarative components clearly indicate conditional blocks.
- Structural Clarity: Your JSX visually reflects the if-else if-else flow.
- Reduced Boilerplate: No need for manual wrapping of expressions for else conditions.

## 🤝 Contributing

We welcome contributions! Please see our CONTRIBUTING.md for guidelines on how to contribute to this project, report bugs, and suggest features.

## 📄 License

This project is licensed under the MIT License.
