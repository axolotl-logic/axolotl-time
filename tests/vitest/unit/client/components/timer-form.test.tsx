import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { TimerForm } from "~/client/components/timer-form";

describe("TimerForm", () => {
  test("should render a form ", () => {
    render(<TimerForm />);
    expect(screen.getByRole("form")).toBeDefined();
  });
});
