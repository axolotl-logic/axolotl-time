import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingPage } from "~/client/components/loading-page";

describe("LoadingPage", () => {
  test("should render", () => {
    render(<LoadingPage />);
    expect(screen.getByTestId("loading-page")).toBeDefined();
  });
});
