import { cleanup } from "@testing-library/react";
import "fake-indexeddb/auto";
import { afterEach, beforeEach, vi } from "vitest";
import { db } from "./client/db";

beforeEach(async () => {
  await db.nav.clear();
  await db.timer.clear();

  // tell vitest we use mocked time
  vi.useFakeTimers();
});

afterEach(() => {
  // restoring date after each test run
  vi.useRealTimers();

  // Prevent duplicate renders of components
  cleanup();
});
