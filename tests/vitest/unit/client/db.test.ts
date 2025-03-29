import { expect, test } from "vitest";

import { db } from "~/client/db";

test("client db should load", () => {
  expect(db.hasFailed()).toBeFalsy();
});
