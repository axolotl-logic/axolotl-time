import { test, expect } from "@playwright/test";

const BASE_URL = process.env.TEST_BASE_URL ?? "http://localhost:3000";

test("home loads with a visible main", async ({ page }) => {
  await page.goto(BASE_URL + "/");

  await expect(page.getByRole("main")).toBeVisible();
});
