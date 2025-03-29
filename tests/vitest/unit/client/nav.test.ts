import { expect, test } from "vitest";
import { getSessionId, navigate } from "~/client/nav";

test("getSessionId should set and stabalize", () => {
  const expected = getSessionId();
  const actual = getSessionId();

  expect(expected).toEqual(actual);
});

test("navigate should lead home", () => {
  navigate({
    page: "home",
  });

  expect(window.location.pathname).toEqual("/");
});
