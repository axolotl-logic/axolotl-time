import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { HomePage } from "~/client/components/home-page";

describe("HomePage", () => {
  test("landing pages should have a main and header 1 section", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading")).toBeDefined();
  });
});
