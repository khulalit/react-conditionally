import React from "react";

// --- Type Definitions ---

/**
 * Props for the If component.
 * @typedef {object} IfProps
 * @property {boolean} condition - The condition to evaluate.
 * @property {React.ReactNode} children - The child components to render.
 */
interface IfProps {
  condition: boolean;
  children: React.ReactNode;
}

/**
 * Props for the Else component.
 * @typedef {object} ElseProps
 * @property {React.ReactNode} children - The child components to render.
 */
interface ElseProps {
  children: React.ReactNode;
}

/**
 * Props for the Switch component.
 * @typedef {object} SwitchProps
 * @property {any} value - The value to match against 'Case' components.
 * @property {React.ReactNode} children - The 'Case' and 'Default' components.
 */
interface SwitchProps {
  value: any;
  children: React.ReactNode;
}

/**
 * Props for the Case component.
 * @typedef {object} CaseProps
 * @property {any} when - The value to match against the Switch's value.
 * @property {React.ReactNode} children - The child components to render when the 'when' prop matches.
 */
interface CaseProps {
  when: any;
  children: React.ReactNode;
}

/**
 * Props for the Default component.
 * @typedef {object} DefaultProps
 * @property {React.ReactNode} children - The child components to render if no Case matches.
 */
interface DefaultProps {
  children: React.ReactNode;
}

// --- If/Else Components ---

/**
 * If component for conditional rendering.
 * Renders its children if the 'condition' prop is true.
 * It also passes the condition result down to its children,
 * allowing an 'Else' component to pick it up.
 */
export const If: React.FC<IfProps> = ({ condition, children }) => {
  // Filter children to find the If block and potential Else block.
  // We explicitly look for a child with type 'Else' to handle the else case.
  const ifBlock = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child.type as React.FC<ElseProps>).name !== "Else"
  );
  const elseBlock = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child.type as React.FC<ElseProps>).name === "Else"
  );

  if (condition) {
    return ifBlock || null;
  } else {
    return elseBlock || null;
  }
};

/**
 * Else component for conditional rendering, used in conjunction with 'If'.
 * Renders its children if the 'If' component's condition was false.
 * It doesn't have its own condition prop, as it relies on the parent 'If'.
 */
export const Else: React.FC<ElseProps> = ({ children }) => {
  // This component acts as a placeholder for the else content.
  // Its rendering is controlled by the parent 'If' component.
  return <>{children}</>;
};

// --- Switch/Case Components ---

/**
 * SwitchContext provides the value to the Case components.
 * This allows Case components to access the value from the parent Switch component
 * without prop drilling.
 */
const SwitchContext = React.createContext<any>(null);

/**
 * Switch component for conditional rendering based on a value.
 * It takes a 'value' prop and provides it to its 'Case' children via context.
 * It renders the first 'Case' component whose 'when' prop matches the 'value',
 * or the 'Default' component if no 'Case' matches.
 */
export const Switch: React.FC<SwitchProps> = ({ value, children }) => {
  let matchedChild: React.ReactNode | null = null;
  let defaultChild: React.ReactNode | null = null;

  // Iterate through children to find the first matching Case or the Default.
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      // Type assertion to access props.when safely
      if (
        (child.type as React.FC<CaseProps>).name === "Case" &&
        (child.props as CaseProps).when === value &&
        !matchedChild
      ) {
        matchedChild = child;
      } else if (
        (child.type as React.FC<DefaultProps>).name === "Default" &&
        !defaultChild
      ) {
        defaultChild = child;
      }
    }
  });

  // Render the matched child or the default child.
  return (
    <SwitchContext.Provider value={value}>
      {matchedChild || defaultChild}
    </SwitchContext.Provider>
  );
};

/**
 * Case component for conditional rendering within a 'Switch'.
 * Renders its children if its 'when' prop matches the 'value' provided by the parent 'Switch'.
 */
export const Case: React.FC<CaseProps> = ({ children }) => {
  // The actual matching logic is handled by the parent Switch component.
  // This component simply renders its children if it's the selected Case.
  return <>{children}</>;
};

/**
 * Default component for 'Switch', similar to a 'default' case in a JavaScript switch statement.
 * Renders its children if no 'Case' components in the parent 'Switch' match the value.
 */
export const Default: React.FC<DefaultProps> = ({ children }) => {
  // This component acts as a fallback for the Switch statement.
  // Its rendering is controlled by the parent 'Switch' component.
  return <>{children}</>;
};
