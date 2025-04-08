import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { VisualTimer } from "~/client/components/visual-timer";

describe("VisualTimer", () => {
  for (const status of ["break", "work"] as const) {
    for (const progress of [0, 50, 100]) {
      test(`should display text ${status} with status=${status} progress=${progress.toString()}`, () => {
        render(<VisualTimer status={status} progress={progress} />);
        expect(screen.getByRole("figure")).toBeDefined();
      });
    }
  }
});
