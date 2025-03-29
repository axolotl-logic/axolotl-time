import { expect, test } from "vitest";
import manifest, { AppName } from "~/app/manifest";

test("Manifest's name should match the exported app name", () => {
  const m = manifest();
  expect(m.name).toEqual(AppName);
});
