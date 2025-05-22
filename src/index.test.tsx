import React from "react";
import { render, screen } from "@testing-library/react";
// Adjust the import path if your components are in a different file, e.g., './components'
import { If, Else, Switch, Case, Default } from "./index";

describe("Conditional Rendering Components", () => {
  // --- If / Else Tests ---
  describe("If and Else Components", () => {
    it("should render If content when condition is true", () => {
      render(
        <If condition={true}>
          <span>If Content</span>
          <Else>
            <span>Else Content</span>
          </Else>
        </If>
      );
      expect(screen.getByText("If Content")).toBeInTheDocument();
      expect(screen.queryByText("Else Content")).not.toBeInTheDocument();
    });

    it("should render Else content when condition is false", () => {
      render(
        <If condition={false}>
          <span>If Content</span>
          <Else>
            <span>Else Content</span>
          </Else>
        </If>
      );
      expect(screen.queryByText("If Content")).not.toBeInTheDocument();
      expect(screen.getByText("Else Content")).toBeInTheDocument();
    });

    it("should render nothing if condition is false and no Else is provided", () => {
      render(
        <If condition={false}>
          <span>If Content</span>
        </If>
      );
      expect(screen.queryByText("If Content")).not.toBeInTheDocument();
    });

    it("should render If content even if Else is present but condition is true", () => {
      render(
        <If condition={true}>
          <div>Main Content</div>
          <Else>
            <div>Fallback Content</div>
          </Else>
        </If>
      );
      expect(screen.getByText("Main Content")).toBeInTheDocument();
      expect(screen.queryByText("Fallback Content")).not.toBeInTheDocument();
    });

    it("should handle multiple children within If block inside of div", () => {
      render(
        <If condition={true}>
          <div>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
          </div>
        </If>
      );
      expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
      expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
    });
  });

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
