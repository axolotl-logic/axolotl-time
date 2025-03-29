import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Button } from "~/client/components/ui/button";

test("<Button> should render a compliant button", () => {
  render(<Button />);
  expect(screen.getByRole("button"));
});
