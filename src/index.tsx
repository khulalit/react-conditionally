import React from "react";

// --- Type Definitions ---

/**
 * Props for the IfElse component.
 * @typedef {object} IfElseProps
 * @property {React.ReactNode} children - Should contain one If component, zero or more ElIf components, and optionally one Else component.
 */
interface IfElseProps {
  children: React.ReactNode;
}

/**
 * Props for the If component.
 * @typedef {object} IfProps
 * @property {boolean} condition - The condition to evaluate.
 * @property {React.ReactNode} children - The child components to render when the condition is true.
 */
interface IfProps {
  condition: boolean;
  children: React.ReactNode;
}

/**
 * Props for the ElIf component.
 * @typedef {object} ElIfProps
 * @property {boolean} condition - The condition to evaluate if preceding If/ElIf conditions were false.
 * @property {React.ReactNode} children - The child components to render when this condition is true.
 */
interface ElIfProps {
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

// --- If/ElIf/Else Components ---

/**
 * IfElse component acts as a wrapper for If, ElIf, and optional Else components.
 * It evaluates conditions sequentially and renders the children of the first
 * component (If or ElIf) whose condition is true. If no condition is met,
 * it renders the children of the Else component if provided.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - Expected to contain an <If> component,
 * zero or more <ElIf> components, and optionally an <Else> component.
 */
export const IfElse: React.FC<IfElseProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  let ifComponent: React.ReactElement<IfProps> | undefined;
  const elIfComponents: React.ReactElement<ElIfProps>[] = [];
  let elseComponent: React.ReactElement<ElseProps> | undefined;

  // First pass: Categorize and collect all valid children
  childrenArray.forEach((child) => {
    if (React.isValidElement(child)) {
      if ((child.type as any).displayName === "If") {
        // Only assign the first If component encountered
        if (!ifComponent) {
          ifComponent = child as React.ReactElement<IfProps>;
        }
      } else if ((child.type as any).displayName === "ElIf") {
        elIfComponents.push(child as React.ReactElement<ElIfProps>);
      } else if ((child.type as any).displayName === "Else") {
        // Only assign the first Else component encountered
        if (!elseComponent) {
          elseComponent = child as React.ReactElement<ElseProps>;
        }
      }
    }
  });

  // Validate that an 'If' component is present
  if (!ifComponent) {
    // If no 'If' component is found, return null without an error message
    return null;
  }

  // --- Conditional Rendering Logic ---

  // 1. Evaluate the If condition
  if (ifComponent.props.condition) {
    return ifComponent.props.children;
  }

  // 2. Evaluate ElIf conditions in order
  for (const elIf of elIfComponents) {
    if (elIf.props.condition) {
      return elIf.props.children;
    }
  }

  // 3. Fallback to Else if no If or ElIf condition is met
  return elseComponent ? elseComponent.props.children : null;
};

IfElse.displayName = "IfElse";

/**
 * If component for conditional rendering.
 * This component *must* be a direct child of 'IfElse' and takes a 'condition' prop.
 * Its children are rendered if its condition is true and no preceding If/ElIf condition was true.
 */
export const If: React.FC<IfProps> = ({ children }) => {
  // The actual rendering logic is handled by the parent IfElse component.
  // This component simply serves as a container for the 'true' content.
  return <>{children}</>;
};

If.displayName = "If";

/**
 * ElIf (Else If) component for conditional rendering.
 * This component *must* be a direct child of 'IfElse' and takes a 'condition' prop.
 * Its children are rendered if its condition is true and all preceding If/ElIf conditions were false.
 */
export const ElIf: React.FC<ElIfProps> = ({ children }) => {
  // The actual rendering logic is handled by the parent IfElse component.
  // This component simply serves as a container for the 'else if' content.
  return <>{children}</>;
};

ElIf.displayName = "ElIf";

/**
 * Else component for conditional rendering, used in conjunction with 'IfElse'.
 * This component *must* be a direct child of 'IfElse'.
 * Its children are rendered if all preceding If/ElIf conditions within 'IfElse' were false.
 */
export const Else: React.FC<ElseProps> = ({ children }) => {
  // This component acts as a placeholder for the else content.
  // Its rendering is controlled by the parent 'IfElse' component.
  return <>{children}</>;
};

Else.displayName = "Else";

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
        (child.type as React.FC<CaseProps>).displayName === "Case" &&
        (child.props as CaseProps).when === value &&
        !matchedChild
      ) {
        matchedChild = child;
      } else if (
        (child.type as React.FC<DefaultProps>).displayName === "Default" &&
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

Switch.displayName = "Switch";

/**
 * Case component for conditional rendering within a 'Switch'.
 * Renders its children if its 'when' prop matches the 'value' provided by the parent 'Switch'.
 */
export const Case: React.FC<CaseProps> = ({ children }) => {
  // The actual matching logic is handled by the parent Switch component.
  // This component simply renders its children if it's the selected Case.
  return <>{children}</>;
};

Case.displayName = "Case";

/**
 * Default component for 'Switch', similar to a 'default' case in a JavaScript switch statement.
 * Renders its children if no 'Case' components in the parent 'Switch' match the value.
 */
export const Default: React.FC<DefaultProps> = ({ children }) => {
  // This component acts as a fallback for the Switch statement.
  // Its rendering is controlled by the parent 'Switch' component.
  return <>{children}</>;
};

Default.displayName = "Default";
