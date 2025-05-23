import React from "react";
import { render, screen } from "@testing-library/react";
import { If, Else, Switch, Case, Default, IfElse, ElIf } from "./index";

describe("Conditional Rendering Components", () => {
  // --- IfElse / If / ElIf / Else Tests ---
  describe("IfElse, If, ElIf, and Else Components", () => {
    it("should render If content when its condition is true", () => {
      render(
        <IfElse>
          <If condition={true}>
            <span>If Content</span>
          </If>
          <Else>
            <span>Else Content</span>
          </Else>
        </IfElse>
      );
      expect(screen.getByText("If Content")).toBeInTheDocument();
      expect(screen.queryByText("Else Content")).not.toBeInTheDocument();
    });

    it("should render Else content when If condition is false", () => {
      render(
        <IfElse>
          <If condition={false}>
            <span>If Content</span>
          </If>
          <Else>
            <span>Else Content</span>
          </Else>
        </IfElse>
      );
      expect(screen.queryByText("If Content")).not.toBeInTheDocument();
      expect(screen.getByText("Else Content")).toBeInTheDocument();
    });

    it("should render nothing if If condition is false and no Else is provided", () => {
      render(
        <IfElse>
          <If condition={false}>
            <span>If Content</span>
          </If>
        </IfElse>
      );
      expect(screen.queryByText("If Content")).not.toBeInTheDocument();
    });

    it("should handle multiple children within If block correctly", () => {
      render(
        <IfElse>
          <If condition={true}>
            <div>
              <p>Paragraph 1</p>
              <p>Paragraph 2</p>
            </div>
          </If>
        </IfElse>
      );
      expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
      expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
    });

    it("should render ElIf content when If is false and ElIf is true", () => {
      render(
        <IfElse>
          <If condition={false}>
            <span>If Content</span>
          </If>
          <ElIf condition={true}>
            <span>ElIf Content</span>
          </ElIf>
          <Else>
            <span>Else Content</span>
          </Else>
        </IfElse>
      );
      expect(screen.queryByText("If Content")).not.toBeInTheDocument();
      expect(screen.getByText("ElIf Content")).toBeInTheDocument();
      expect(screen.queryByText("Else Content")).not.toBeInTheDocument();
    });

    it("should render the first matching ElIf when multiple ElIfs are present", () => {
      render(
        <IfElse>
          <If condition={false}>
            <span>If Content</span>
          </If>
          <ElIf condition={false}>
            <span>First ElIf (False)</span>
          </ElIf>
          <ElIf condition={true}>
            <span>Second ElIf (True)</span>
          </ElIf>
          <ElIf condition={true}>
            <span>Third ElIf (True - should not render)</span>
          </ElIf>
          <Else>
            <span>Else Content</span>
          </Else>
        </IfElse>
      );
      expect(screen.queryByText("If Content")).not.toBeInTheDocument();
      expect(screen.queryByText("First ElIf (False)")).not.toBeInTheDocument();
      expect(screen.getByText("Second ElIf (True)")).toBeInTheDocument();
      expect(
        screen.queryByText("Third ElIf (True - should not render)")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Else Content")).not.toBeInTheDocument();
    });

    it("should render Else content when If and all ElIf conditions are false", () => {
      render(
        <IfElse>
          <If condition={false}>
            <span>If Content</span>
          </If>
          <ElIf condition={false}>
            <span>ElIf Content 1</span>
          </ElIf>
          <ElIf condition={false}>
            <span>ElIf Content 2</span>
          </ElIf>
          <Else>
            <span>Else Content</span>
          </Else>
        </IfElse>
      );
      expect(screen.queryByText("If Content")).not.toBeInTheDocument();
      expect(screen.queryByText("ElIf Content 1")).not.toBeInTheDocument();
      expect(screen.queryByText("ElIf Content 2")).not.toBeInTheDocument();
      expect(screen.getByText("Else Content")).toBeInTheDocument();
    });

    it("should render nothing if If, all ElIfs are false, and no Else is provided", () => {
      render(
        <IfElse>
          <If condition={false}>
            <span>If Content</span>
          </If>
          <ElIf condition={false}>
            <span>ElIf Content</span>
          </ElIf>
        </IfElse>
      );
      expect(screen.queryByText("If Content")).not.toBeInTheDocument();
      expect(screen.queryByText("ElIf Content")).not.toBeInTheDocument();
    });

    it("should prioritize If over ElIf and Else even if ElIf/Else conditions are met", () => {
      render(
        <IfElse>
          <If condition={true}>
            <span>Primary If Content</span>
          </If>
          <ElIf condition={true}>
            <span>ElIf Content</span>
          </ElIf>
          <Else>
            <span>Else Content</span>
          </Else>
        </IfElse>
      );
      expect(screen.getByText("Primary If Content")).toBeInTheDocument();
      expect(screen.queryByText("ElIf Content")).not.toBeInTheDocument();
      expect(screen.queryByText("Else Content")).not.toBeInTheDocument();
    });

    it("should log an error if no If component is provided", () => {
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      render(
        <IfElse>
          <ElIf condition={true}>
            <span>ElIf Content</span>
          </ElIf>
          <Else>
            <span>Else Content</span>
          </Else>
        </IfElse>
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "IfElse component must contain an 'If' child."
      );
      expect(screen.queryByText("ElIf Content")).not.toBeInTheDocument();
      expect(screen.queryByText("Else Content")).not.toBeInTheDocument();
      consoleErrorSpy.mockRestore();
    });

    it("should log a warning for unexpected child types", () => {
      const consoleWarnSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});
      render(
        <IfElse>
          <If condition={true}>
            <span>If Content</span>
          </If>
          <div>Unexpected Div</div>
        </IfElse>
      );
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "IfElse component contains an unexpected child type: div. Only If, ElIf, and Else are supported."
      );
      expect(screen.getByText("If Content")).toBeInTheDocument();
      expect(screen.queryByText("Unexpected Div")).not.toBeInTheDocument(); // Unexpected child is not rendered
      consoleWarnSpy.mockRestore();
    });
  });

  // --- Switch / Case / Default Tests (Re-included for completeness, assuming they are in a separate file or will be added back) ---
  // If your Switch/Case components are in a separate file, you'd import them and test them there.
  // For this example, assuming they are no longer in the same file as IfElse.
  // If they are still in the same file, you would uncomment and adjust these tests.

  // --- Switch / Case / Default Tests ---
  describe("Switch, Case, and Default Components", () => {
    it("should render the correct Case when value matches", () => {
      render(
        <Switch value="apple">
          <Case when="banana">
            <span>Banana Case</span>
          </Case>
          <Case when="apple">
            <span>Apple Case</span>
          </Case>
          <Default>
            <span>Default Case</span>
          </Default>
        </Switch>
      );
      expect(screen.getByText("Apple Case")).toBeInTheDocument();
      expect(screen.queryByText("Banana Case")).not.toBeInTheDocument();
      expect(screen.queryByText("Default Case")).not.toBeInTheDocument();
    });

    it("should render Default when no Case matches", () => {
      render(
        <Switch value="grape">
          <Case when="banana">
            <span>Banana Case</span>
          </Case>
          <Case when="apple">
            <span>Apple Case</span>
          </Case>
          <Default>
            <span>Default Case</span>
          </Default>
        </Switch>
      );
      expect(screen.queryByText("Banana Case")).not.toBeInTheDocument();
      expect(screen.queryByText("Apple Case")).not.toBeInTheDocument();
      expect(screen.getByText("Default Case")).toBeInTheDocument();
    });

    it("should render nothing if no Case matches and no Default is provided", () => {
      render(
        <Switch value="grape">
          <Case when="banana">
            <span>Banana Case</span>
          </Case>
          <Case when="apple">
            <span>Apple Case</span>
          </Case>
        </Switch>
      );
      expect(screen.queryByText("Banana Case")).not.toBeInTheDocument();
      expect(screen.queryByText("Apple Case")).not.toBeInTheDocument();
    });

    it("should render only the first matching Case", () => {
      render(
        <Switch value={1}>
          <Case when={1}>
            <span>First Match</span>
          </Case>
          <Case when={1}>
            <span>Second Match (should not render)</span>
          </Case>
          <Case when={2}>
            <span>Another Case</span>
          </Case>
        </Switch>
      );
      expect(screen.getByText("First Match")).toBeInTheDocument();
      expect(
        screen.queryByText("Second Match (should not render)")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Another Case")).not.toBeInTheDocument();
    });

    it("should handle different types of values for Switch and Case (e.g., numbers)", () => {
      render(
        <Switch value={10}>
          <Case when={5}>
            <span>Five</span>
          </Case>
          <Case when={10}>
            <span>Ten</span>
          </Case>
          <Default>
            <span>Other Number</span>
          </Default>
        </Switch>
      );
      expect(screen.getByText("Ten")).toBeInTheDocument();
      expect(screen.queryByText("Five")).not.toBeInTheDocument();
      expect(screen.queryByText("Other Number")).not.toBeInTheDocument();
    });

    it("should handle boolean values for Switch and Case", () => {
      render(
        <Switch value={true}>
          <Case when={false}>
            <span>False Case</span>
          </Case>
          <Case when={true}>
            <span>True Case</span>
          </Case>
        </Switch>
      );
      expect(screen.getByText("True Case")).toBeInTheDocument();
      expect(screen.queryByText("False Case")).not.toBeInTheDocument();
    });

    it("should handle null/undefined values for Switch and Case", () => {
      render(
        <Switch value={null}>
          <Case when={undefined}>
            <span>Undefined Case</span>
          </Case>
          <Case when={null}>
            <span>Null Case</span>
          </Case>
          <Default>
            <span>No Match</span>
          </Default>
        </Switch>
      );
      expect(screen.getByText("Null Case")).toBeInTheDocument();
      expect(screen.queryByText("Undefined Case")).not.toBeInTheDocument();
      expect(screen.queryByText("No Match")).not.toBeInTheDocument();
    });
  });
});
