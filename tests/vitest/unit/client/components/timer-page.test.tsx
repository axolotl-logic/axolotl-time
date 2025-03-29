import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TimerPage } from "~/client/components/timer-page";
import { HOUR, SECOND } from "~/lib/time";

describe("TimerPage", () => {
  it("should start with work period when joining at start time", () => {
    vi.setSystemTime(0);

    render(
      <TimerPage
        workLength={HOUR}
        breakLength={HOUR}
        startTime={0}
        others={0}
      />,
    );

    expect(screen.getByRole("main")).toBeDefined();
    expect(screen.getByText("work")).toBeDefined();
  });

  it("should start with break period when joing after work", () => {
    vi.setSystemTime(HOUR + SECOND);

    render(
      <TimerPage
        workLength={HOUR}
        breakLength={HOUR}
        startTime={0}
        others={0}
      />,
    );

    expect(screen.getByRole("main")).toBeDefined();
    expect(screen.getByText("break")).toBeDefined();
  });
});
