import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Link } from "~/client/components/ui/link";

test("<Link> should render an element with the link role", () => {
  render(<Link route={{ page: "home" }}>Hello</Link>);
  expect(screen.getByRole("link"));
});
