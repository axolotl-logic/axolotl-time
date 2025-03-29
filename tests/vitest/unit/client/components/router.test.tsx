import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Router } from "~/client/components/router";
import { HOUR } from "~/lib/time";

const exampleRoutes = [
  { page: "home" },
  {
    page: "timer",
    workLength: HOUR,
    breakLength: HOUR,
    startTime: 0,
  },
] as const;

describe("Router", () => {
  for (const defaultRoute of exampleRoutes) {
    test(`should render with defaultRoute=${JSON.stringify(defaultRoute)}`, () => {
      render(<Router defaultRoute={defaultRoute} />);
      expect(screen.getByRole("main")).toBeDefined();
    });
  }
});
