import { render, screen } from "@testing-library/react";
import { fail } from "assert";
import { expect, test, vi } from "vitest";
import { Router } from "~/client/components/router";

const MAX_ENGAGEMENTS = 150;

type Engagement = {
  work: () => void;
};

function chooseEngagement(engagements: Engagement[]): Engagement | null {
  return engagements[Math.floor(Math.random() * engagements.length)] ?? null;
}

function getEngagements() {
  const buttons = screen.queryAllByRole("button");
  const links = screen.queryAllByRole("link");

  const clickables = [...buttons, ...links];

  return clickables.map((el) => ({
    work: () => el.click(),
  }));
}

// TODO: Fixed seed
test("app prevails", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {
    fail("console.error call detected");
  });

  render(<Router defaultRoute={{ page: "home" }} />);

  // invariants
  const expectHealthy = () => {
    expect(screen.getByRole("main")).toBeDefined();
  };

  for (let i = 0; i < MAX_ENGAGEMENTS; i++) {
    const engagements = getEngagements();
    const engagement = chooseEngagement(engagements);
    if (!engagement) {
      break;
    }

    engagement.work();
    expectHealthy();
  }
});
